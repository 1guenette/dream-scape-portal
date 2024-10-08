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

  const [data, setData] = useState({})
  const [treeData, setTreeData] = useState({})
  const [currNode, setCurrNode] = useState({})
  const [levelList, setLevelList] = useState([])

  function updateStory(levelData){
    setData(levelData)
    updateTreeGraphic(levelData)
  }

  function updateTreeGraphic(data){

    if(levelList.length === 0)
    {
      let updatedTree = {name: data.levelName, levelPrompt: data.levelPrompt, children:[], parent: null}
      let updatedList = [data.levelName]
      updatedTree.children = data.options.map((val)=>{
        updatedList.push(val.input)
        return {name: val.input, levelPrompt: null, children:[], parent: updatedTree.name}
      })
      setTreeData(updatedTree)
      setLevelList(updatedList)
    }
    else{

    }
  }

  function findNode(tree, nameSel){

    console.log(tree.name === nameSel)
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


  //TODO: Test
  function replaceNodeByName(tree, targetName, newSubTree) {
    if (tree.name === targetName) {
      return newSubTree; // Replace the node with the new subtree
    }
  
    if (tree.children && tree.children.length > 0) {
      tree.children = tree.children.map(child => replaceNodeByName(child, targetName, newSubTree));
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
            onClick: (e, node) => { updateCurrNode(node, e) },
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