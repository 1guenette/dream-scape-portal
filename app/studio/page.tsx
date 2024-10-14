'use client'
import Dropdown from "./dropdown";
import { Tree, AnimatedTree } from 'react-tree-graph';
import StoryForm from './StudioForm/StoryForm'
import Tree2 from "./StudioForm/Tree2";
import { useState } from "react";
import axios from "axios";
// import "./graph.css";
// import "../globals.css";
// import "bootstrap/dist/css/bootstrap.min.css"





export default function Studio() {

  const [data, setData] = useState({})
  const [treeData, setTreeData] = useState({})
  const [currNode, setCurrNode] = useState({children: []})
  const [levelList, setLevelList] = useState<any[]>([])
  

  function updateStory(levelData){
    setData(levelData)
    updateTreeGraphic(levelData)
  }

  function submitData(formData) {

    let options = {
          url: `/api/studio`,
          method: 'POST',
          rejectUnauthorized: false,
          data: formData
      }
  
      axios(options).then(async (res: any) => {
        console.log("HAHAHAHAHAHAHAHA_____")
        console.log(res)
  
      });
  
  }

  function updateTreeGraphic(data){
    if(levelList.length === 0) 
    {
      let updatedTree = {name: data.levelName, levelPrompt: data.levelPrompt, children:[], parent: null, image: data.image}
      let updatedList = [data.levelName]
      updatedTree.children = data.children.map((val)=>{
        updatedList.push(val.name)
        return {name: val.name, levelPrompt: null, children:[], parent: updatedTree.name, loopBack: val.loopBack, loopBackText: val.loopBackText}
      })
      setTreeData(updatedTree)
      setCurrNode(updatedTree)
      setLevelList(updatedList)
      submitData(updatedTree)
    }
    else{
      let updatedSubTree = {name: data.levelName, levelPrompt: data.levelPrompt, children: data?.children || [], parent: null,  image: data.image}
      let updatedList = [data.levelName]
      let updatedTree = replaceNodeByName(treeData, updatedSubTree, currNode)
      setTreeData(updatedTree)
      submitData(updatedTree)
    }
  }

  function findNode(tree, nameSel){

    if(tree.name === nameSel){
      return tree
    }
    
    if(tree.children && tree.children.length > 0 ){
      
      for (let node of tree.children){
        const res = findNode(node, nameSel)
        if(res){
          return res
        }
      }
    }
    return null;
  }


  function replaceNodeByName(tree, newSubTree, node) {
    if (tree.name === node.name) {
      return newSubTree; // Replace the node with the new subtree
    }
  
    if (tree.children && tree.children.length > 0) {
      tree.children = tree.children.map(child => replaceNodeByName(child, newSubTree, node));
    }
  
    return tree; // Return the modified tree
  }

  
  function updateCurrNode(nodeName){
    let nodeSelected = findNode(treeData, nodeName)
    setCurrNode(nodeSelected)
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
            onClick: (e, node) => { updateCurrNode(node) },
            onContextMenu: (e) => { console.log(e) }
          }}
        />
      </div>
      <div className="flex items-center justify-center">
        <StoryForm nodeSelected={currNode} updateStory={updateStory}/>
      </div>
    </main>
  )
}