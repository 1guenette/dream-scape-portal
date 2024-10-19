'use client'
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import platoDungeon from '../library/test1/test1.json'
import { title, subtitle } from "@/components/primitives";

export default function Home() {

  const [step, setStep] = useState(platoDungeon.start)
  const [gameMap, setGameMap] = useState(platoDungeon)
  const [promptDisplay, setPromptDisplay] = useState("")
  const [popupPrompt, setPopupPrompt] = useState("")

  useEffect(() => {
    let i = 0;
    const stringResponse = gameMap.steps[step].prompt
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
  }, [step])


  function handleSelection(opt: any) {
    if (!opt.popupNote) 
    {
      setStep(opt.next)
      setPopupPrompt('')
    }
    else 
    {
      setPopupPrompt(opt.popupNote)
    }
  }

  function generateOptions() {
    if (!gameMap.steps[`${step}`].ending) {
      return gameMap.steps[`${step}`].options.map((opt: any, i: number) => {
        return <Button key={i} id={opt.id} value={opt.next} color="primary" variant="ghost" onClick={() => handleSelection(opt)}>{opt.description}</Button>
      })
    }
    else {
      return <>
        <Button color="primary" variant="ghost" onClick={() => { window.location.href = '/game' }}>Play Again</Button>
        <Button color="primary" variant="ghost" onClick={() => { window.location.href = '/story-library' }}>New Dream</Button>
      </>
    }
  }

  return (

    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        {/* <h1 className={title()}>Welcome to&nbsp;</h1> */}
        <h1 className={title({ color: "violet" })}>{gameMap["title"]}&nbsp;</h1>
        <br />
      </div>

      <div className="flex gap-3">
        <p>
          {gameMap["title"]}
        </p>
      </div>

      <div >
        <Image
          // className={styles.logo}
          src={`/game-library/test1${gameMap.steps[`${step}`].image}`}
          alt=""
          width={560}
          height={74}
          priority
        />
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

      <div>
        {generateOptions()}
      </div>
    </section>

  );
}
