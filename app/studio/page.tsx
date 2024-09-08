'use client'
import Dropdown from "./dropdown";
import { Tree, AnimatedTree } from 'react-tree-graph';
import StoryForm from './StudioForm/StoryForm'
import Tree2 from "./StudioForm/Tree2";
import { useState } from "react";
// import "./graph.css";
// import "../globals.css";
// import "bootstrap/dist/css/bootstrap.min.css"





export default function Studio() {

  const dataTest = {
    name: 'Root',
    // children: [
    //   {
    //     name: 'Child One',
    //     children: [
    //       {
    //         name: 'Child One'
    //       },
    //       {
    //         name: 'Child Two'
    //       }
    //     ]
    //   },

  }

  const [data, setData] = useState({})
  const [treeData, setTreeData] = useState({})

  function updateStory(levelData){
    console.log("Updating Story")
    console.log(levelData)
    setData(levelData)
    updateTreeGraphic(levelData)


  }

  function updateTreeGraphic(data){

  //   {
  //     "levelName": "test",
  //     "levelPrompt": "test prompt",
  //     "options": [
  //         {
  //             "option": "enter the good room",
  //             "loopBack": false,
  //             "loopBackText": "no"
  //         },
  //         {
  //             "option": "enter the good room",
  //             "loopBack": false,
  //             "loopBackText": null
  //         }
  //     ]
  // }



  // if root   
    if (!treeData.children){
      let updatedTree = {name: data.levelName}
      updatedTree.children = data.options.map((val)=>{
        console.log("XXXXX")
        console.log(val)
        return {name: val.option, children:[]}
      })
      console.log("UPDATING TREE")
      console.log(updatedTree)
      setTreeData(updatedTree)
    }
    else{

    }
  }



  return (

    <main className="dark text-foreground bg-background">
      <div style={{overflowX: "scroll"}}>
        <AnimatedTree
          data={treeData}
          height={400}
          width={400}
          svgProps={{
            className: 'custom'
          }}
          gProps={{
            onClick: (e, node) => { console.log(node) },
            onContextMenu: (e) => { console.log(e) }
          }}
        />
      </div>
      <div className="flex items-center justify-center">
        <StoryForm data={data} updateStory={updateStory}/>
      </div>
    </main>
  )
}