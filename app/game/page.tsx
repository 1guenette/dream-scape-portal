'use client'
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { title, subtitle } from "@/components/primitives";
import axios from "axios";

export default function Home(props) {

  const [stepId, setStepId] = useState(null)
  const [gameMap, setGameMap] = useState<any>(null)
  const [promptDisplay, setPromptDisplay] = useState("")
  const [imageLink, setImageLink] = useState("")

  const [popupPrompt, setPopupPrompt] = useState("")

  useEffect( () => {
   

    if(stepId !== null){
    
    //types out prompt
    let i = 0;
    const stringResponse = gameMap?.levelPrompt
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
    }
  }, [stepId])

  useEffect(()=>{
    getStoryData("platos_dungeon")
  }, [])


 async function getStoryData(storyName){
    axios.get(`/api/studio/${storyName}`).then(async (res: any) => {
        setGameMap(res.data)
        setStepId(res.data.id)
        setImageLink( `/game-library/${storyName}/${res.data.id}.${res.data.imageExt}`)


    }).catch(err=>{

    });
  }  
  
  function handleSelection(opt: any) {
    if (!opt.loopBack) 
    {
        setGameMap(opt)
        setStepId(opt.id)
        setImageLink(`/game-library/${"platos_dungeon"}/${opt.id}.${opt.imageExt}`)
        setPopupPrompt('')
    }
    else 
    {
        setPopupPrompt(opt.loopBackText)
    }
  }


  function generateOptions() {


    if(gameMap){
     if (!gameMap?.ending) {
       return gameMap?.children.map((opt: any, i: number) => {
         return <Button key={opt.id} id={opt.id} value={opt.id} color="primary" variant="ghost" onClick={() => handleSelection(opt)}>{opt.name}</Button>
       })
    return <></>
     }
     else {
        return <>
        <Button color="primary" variant="ghost" onClick={() => { window.location.href = `/game/${"platos_dungeon"}` }}>Play Again</Button>
        <Button color="primary" variant="ghost" onClick={() => { window.location.href = '/story-library' }}>New Dream</Button>
        </>
     }
    }
    else{
        return <></>
    }
  }

  return (

    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        {/* <h1 className={title()}>Welcome to&nbsp;</h1> */}
        <h1 className={title({ color: "violet" })}>{"platos_dungeon"}&nbsp;</h1>
        <br />
      </div>

      <div >
        <Image
          // className={styles.logo}
          src={imageLink}
          alt=""
          width={560}
          height={560}
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
