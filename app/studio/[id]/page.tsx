'use client'
import Dropdown from "../dropdown";
import { Tree, AnimatedTree } from 'react-tree-graph';
import StoryForm from '../StudioForm/StoryForm'
import Tree2 from "../StudioForm/Tree2";
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'next/navigation'
// import "./graph.css";
// import "../globals.css";
// import "bootstrap/dist/css/bootstrap.min.css"

export default function Studio() {

  const params = useParams()

  const [treeData, setTreeData] = useState({})
  const [currNode, setCurrNode] = useState({children: []})
  const [levelList, setLevelList] = useState<any[]>([])
  

  function updateStory(levelData){
    updateTreeGraphic(levelData)
  }

  function submitData(formData, currNodeData) {
    let stortName = params.id as string

    let form = new FormData();    
    //form.append("image", new Blob([formData.image], {type: formData.image.type}))
    form.append("image", currNodeData.image)
    form.append("levelData", JSON.stringify(currNodeData))
    form.append("fullTreeData", JSON.stringify(formData))
    form.append("storyName", stortName)

    axios.post(`/api/studio/${stortName}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(async (res: any) => {

    }).catch(err=>{

    });

  }

  function updateTreeGraphic(data){
    if(levelList.length === 0) 
    {
      let updatedTree = {id: uuidv4(), name: data.levelName, levelPrompt: data.levelPrompt, children:[], parent: null, image: data.image, ending: data.ending}
      let updatedList = [data.levelName]
      updatedTree.children = data.children?.map((val)=>{
        updatedList.push(val.name)
        return {id: uuidv4(), name: val.name, levelPrompt: null, children:[], parent: updatedTree.name, loopBack: val.loopBack, loopBackText: val.loopBackText}
      })
      setTreeData(updatedTree)
      setCurrNode(updatedTree)
      setLevelList(updatedList)
      submitData(updatedTree, updatedTree)
    }
    else{
      let children =  data?.children.map(val=>Object.assign(val, {id: uuidv4()}) )
      let updatedSubTree = {id: data.id, name: data.levelName, levelPrompt: data.levelPrompt, children: children || [], parent: null,  image: data.image, ending: data.ending}
      let updatedList = levelList.concat(data.children.map(v => v.name))
      let updatedTree = replaceNodeByName(treeData, updatedSubTree, currNode)
      setLevelList(updatedList)
      setTreeData(updatedTree)
      setCurrNode(updatedSubTree)
      submitData(updatedTree, updatedSubTree)
    }
  }

  function levelsAlreadyExist(){

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
        {/* navbar */}
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
        <StoryForm nodeSelected={currNode} updateStory={updateStory} levelList={levelList}/>
      </div>
    </main>
  )
}