'use client'
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import platoDungeon from '../library/test1/test1.json'

export default function Home() {

  const [step, setStep] = useState(platoDungeon.start)
  const [gameMap, setGameMap] = useState(platoDungeon)

  const [promptDisplay, setPromptDisplay] = useState("")
  const [popupPrompt, setPopupPrompt] = useState("")

  useEffect(() => {

    let i = 0;
    const stringResponse = gameMap.steps[step].prompt

    const intervalId = setInterval(() => {
      if (i < stringResponse.length + 1) {
        setPromptDisplay(stringResponse.slice(0, i));
        i++;
      }
      else {
        clearInterval(intervalId);
      }
    }, 50);


    return () => clearInterval(intervalId);
  }, [step])


  function handleSelection(opt: any) {
    if (!opt.popupNote) {
      setStep(opt.next)
      setPopupPrompt('')
    }
    else {
      setPopupPrompt(opt.popupNote)
    }
  }

  function generateOptions() {
    if (!gameMap.steps[`${step}`].ending) {

      return gameMap.steps[`${step}`].options.map((opt:any, i:number) => {
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
    <main>
      <div>
        <a
          href="/"
          target="_self"
          rel="noopener noreferrer"
        >
          <p>
            &larr; Lobby
          </p>
        </a>



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
    </main>
  );
}
