'use client'
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { title } from "@/components/primitives";

const IMAGE_SIZE = 560;
// Must match between the visible image and the prefetched ones so the browser
// picks the same srcset candidate and reuses the cached response.
const IMAGE_SIZES = `(max-width: ${IMAGE_SIZE}px) 100vw, ${IMAGE_SIZE}px`;

export default function GameView(props: {
  story: any;
  imageMap: Record<string, string>;
  storyName: string;
}) {
  const { story, imageMap, storyName } = props;

  const [gameMap, setGameMap] = useState<any>(story)
  const [promptDisplay, setPromptDisplay] = useState("")
  const [popupPrompt, setPopupPrompt] = useState("")
  const [prefetchNextImages, setPrefetchNextImages] = useState(false)

  const imageLink = imageMap[gameMap?.id] || null

  useEffect(() => {
    setPrefetchNextImages(false)

    //types out prompt
    let i = 0;
    const stringResponse = gameMap?.levelPrompt || ""
    const intervalId = setInterval(() => {
      if (i < stringResponse.length + 1)
      {
        setPromptDisplay(stringResponse.slice(0, i));
        i++;
      }
      else
      {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [gameMap])

  function handleSelection(opt: any) {
    if (!opt.loopBack)
    {
        setGameMap(opt)
        setPopupPrompt('')
    }
    else
    {
        setPopupPrompt(opt.loopBackText)
    }
  }

  function generateOptions() {
    if (!gameMap?.ending && gameMap?.children?.length > 0) {
      return gameMap.children.map((opt: any) => {
        return <Button key={opt.id} id={opt.id} value={opt.id} color="primary" variant="ghost" onClick={() => handleSelection(opt)}>{opt.name}</Button>
      })
    }

    return <>
      <Button color="primary" variant="ghost" onClick={() => { setGameMap(story); setPopupPrompt('') }}>Play Again</Button>
      <Button color="primary" variant="ghost" onClick={() => { window.location.href = '/story-library' }}>New Dream</Button>
    </>
  }

  // Warms the browser cache for every reachable next level, but only once the
  // current image is done so the two don't compete for bandwidth.
  function generateImagePrefetch() {
    if (!prefetchNextImages || gameMap?.ending) return null

    return <div aria-hidden className="hidden">
      {gameMap?.children?.map((opt: any) => {
        const nextImage = imageMap[opt.id]

        if (!nextImage) return null

        return <Image
          key={opt.id}
          src={nextImage}
          alt=""
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          sizes={IMAGE_SIZES}
          loading="eager"
        />
      })}
    </div>
  }

  return (

    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title({ color: "violet" })}>{storyName}&nbsp;</h1>
        <br />
      </div>

      <div
        className="w-full aspect-square shrink-0"
        style={{ maxWidth: IMAGE_SIZE }}
      >
        {imageLink && <Image
          className="w-full h-full object-contain"
          src={imageLink}
          alt=""
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          sizes={IMAGE_SIZES}
          priority
          onLoad={() => setPrefetchNextImages(true)}
          onError={() => setPrefetchNextImages(true)}
        />}
      </div>

       <div>
        <p>
          {promptDisplay}
        </p>
      </div>
      <div>
        <p>
          {popupPrompt}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {generateOptions()}
      </div>

      {generateImagePrefetch()}

    </section>

  );
}
