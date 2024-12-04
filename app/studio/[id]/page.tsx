'use client'
import Dropdown from "../dropdown";
import { Tree, AnimatedTree } from 'react-tree-graph';
import StoryForm from '../StudioForm/StoryForm'
import Tree2 from "../StudioForm/Tree2";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'next/navigation'
// import "./graph.css";
// import "../globals.css";
// import "bootstrap/dist/css/bootstrap.min.css"

export default function Studio() {

  const params = useParams()

  const [storyName, setStoryName] = useState(params.id)
  const [treeData, setTreeData] = useState({id:null})
  const [currNode, setCurrNode] = useState({children: []})
  const [levelList, setLevelList] = useState<any[]>([])

  useEffect(()=>{
    getStoryData()

  },[])
  

  function getStoryData(){
    let stortName = params.id as string
    axios.get(`/api/studio/${stortName}`).then(async (res: any) => {
      setTreeData(res.data)
    }).catch(err=>{

    });
  }

  function updateStory(levelData){
    updateTreeGraphic(levelData)
  }

  function submitData(formData, currNodeData, image) {
    let stortName = params.id as string

    let form = new FormData();
    if(image){
      form.append("image", image)
    }
    //form.append("image", currNodeData.image)
    form.append("levelData", JSON.stringify(currNodeData))
    form.append("fullTreeData", JSON.stringify(formData))
    form.append("storyName", stortName)

    axios.post(`/api/studio/${stortName}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(async (res: any) => {
      setCurrNode(currNodeData)
    }).catch(err=>{

    });

  }

  function updateTreeGraphic(data){
    if(!treeData.id) //If first node 
    {
      let updatedTree = {id: uuidv4(), name: data.levelName, levelPrompt: data.levelPrompt, children:[], parent: null, image: data.image, imageExt: data.imageExt, ending: data.ending}
      let updatedList = [updatedTree.id]
      updatedTree.children = data.children?.map((val)=>{
        updatedList.push(val.name)
        return {id: uuidv4(), name: val.name, levelPrompt: null, children:[], parent: updatedTree.name, loopBack: val.loopBack, loopBackText: val.loopBackText}
      })


      let image = data?.image?.name ? data.image : null
      submitData(updatedTree, updatedTree, image)
      setTreeData(updatedTree)
      //setCurrNode(updatedTree)
      setLevelList(updatedList)
    }
    else{
      //add new IDs for new options
      let children =  data.children?.map((val)=>{
        if (!val.id){
          return Object.assign(val, {id: uuidv4()})
        }
        return val
      }) || []

      let updatedSubTree = {id: data.id, name: data.levelName, levelPrompt: data.levelPrompt, children: children || [], parent: null,  image: data.image, imageExt: data.imageExt, ending: data.ending}
      let updatedList = levelList.concat(data.children?.map(v => v.id))
      let updatedTree = replaceNodeById(treeData, updatedSubTree, currNode)


      let image = data?.image?.name ? data.image : null
      submitData(updatedTree, updatedSubTree, image)
      setLevelList(updatedList)
      setTreeData(updatedTree)
      //setCurrNode(updatedSubTree)
    }
  }

  function levelsAlreadyExist(){

  }

  function findNode(tree, idSel){

    if(tree.id === idSel){
      return tree
    }
    
    if(tree.children && tree.children.length > 0 ){
      
      for (let node of tree.children){
        const res = findNode(node, idSel)
        if(res){
          return res
        }
      }
    }
    return null;
  }


  function replaceNodeById(tree, newSubTree, node) {
    if (tree.id === node.id) {
      return newSubTree; // Replace the node with the new subtree
    }
  
    if (tree.children && tree.children.length > 0) {
      tree.children = tree.children.map(child => replaceNodeById(child, newSubTree, node));
    }
  
    return tree; // Return the modified tree
  }

  
  function updateCurrNode(nodeName){
    let nodeSelected = findNode(treeData, nodeName)
    setCurrNode(nodeSelected)
  }

  const CustomNodeLabel = ({ nodeData }) => {
    return (
      <div>
        {nodeData.name} (Value: {nodeData.id})
      </div>
    );
  };



  return (

    <main className="dark text-foreground bg-background">
      <div style={{overflowX: "scroll"}}>
        {/* navbar */}
        <AnimatedTree
          data={treeData}
          // labelProp={"id"}
          keyProp={"id"}
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
        <StoryForm nodeSelected={currNode} updateStory={updateStory} levelList={levelList} storyName={storyName}/>
      </div>
    </main>
  )
}