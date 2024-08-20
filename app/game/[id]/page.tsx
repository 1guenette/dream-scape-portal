'use client'
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Home(props:any) {

    const [step, setStep] = useState(0)
    const [gameMap, setGameMap] = useState(props)
    const [gameTitle, setGameTitle] = useState("")
    const [promptDisplay, setPromptDisplay] = useState("")
    const [popupPrompt, setPopupPrompt] = useState("")
    const [imageDisplay, setImageDisplay] = useState("")

    useEffect(() => {

        if (gameMap.steps) {

            setImageDisplay(gameMap.steps[step].image)

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
        }
    }, [step])

    useEffect(() => {
        fetch(`/api/game/${props.params.id}`).then(async (res) => {
            console.log("XXXXXX")
            console.log(props.params.id)
            let gameJSON = await res.json()
            console.log(gameJSON)
            setStep(gameJSON.start)
            setGameMap(gameJSON)
            setGameTitle(gameJSON.title)
        })

    }, [props])


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


        if (gameMap.steps) {
            if (!gameMap.steps[`${step}`].ending) {

                return gameMap.steps[`${step}`].options.map((opt:any, i:number) => {
                    return <Button key={i} id={opt.id} value={opt.next} color="primary" variant="ghost" onClick={() => handleSelection(opt)}>{opt.description}</Button>
                })
            }
            else {
                return <>
                    <Button color="primary" variant="ghost" onClick={() => { window.location.href = `${window.location.pathname}` }}>Play Again</Button>
                    <Button color="primary" variant="ghost" onClick={() => { window.location.href = '/story-library' }}>New Dream</Button>
                </>
            }
        }
    }


    return (
        <main className={styles.main}>
            <div className={styles.description}>
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
                    {gameTitle}
                </p>



            </div>

            <div className={styles.center}>

                {imageDisplay ? <Image
                    // className={styles.logo}
                    //src={`/game-library/test1/${gameMap?.steps[`${step}`].image}`}
                    src={imageDisplay}
                    alt=""
                    width={560}
                    height={74}
                    priority
                /> : <></>
                }
            </div>

            <div className={styles.center}>
                <p>
                    {promptDisplay}
                </p>
            </div>

            <div className={styles.center}>
                <p>
                    {popupPrompt}
                </p>
            </div>

            <div className={styles.center}>
                {generateOptions()}
            </div>
        </main>
    );
}
