'use client'

import {
  Accordion, AccordionItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Divider, Button, Card, CardHeader, CardBody, CardFooter,
  Select, SelectItem, Image, Checkbox
} from "@nextui-org/react";
import LevelOptions from "./LevelOptions";
import Dropdown from "../dropdown";
import "../graph.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from "react";

//[{option: "enter the good room", loopBack: false, loopBackText: null}, {option: "enter the bad room", loopBack: true, loopBackText: "bad room is locked"}]


export default function StoryForm(props) {

  const [options, setOptions] = useState([])
  const [image, setImage] = useState<any>(null);
  const [levelName, setLevelName] = useState("")
  const [prompt, setPrompt] = useState("")
  const [ending, setEnding] = useState(false)
  const [id, setId] = useState(null)
  const [parentId, setParentId] = useState(null)

  const [imageLink, setImageLink] = useState("")

  useEffect(() => {

    setLevelName(props.nodeSelected?.name)
    setPrompt(props.nodeSelected?.levelPrompt || '')
    setOptions(props.nodeSelected?.children)
    setImage(props.nodeSelected?.image)
    setEnding(props.nodeSelected?.ending || false)
    setId(props.nodeSelected.id)
    
    //setImageDisplay(props.nodeSelected?.image)
    updateImageLink(props.storyName, props.nodeSelected)
    setParentId(props.nodeSelected.prevNodeId || null)

  }, [props.nodeSelected])

  function processSubmission(e) {
    
    //TODO: set and track image type png vs jpeg
    e.preventDefault()

    let imageExt = image?.type === "image/png" ? "png" : "jpeg"; 
    let levelData = { id: id, levelName: levelName, levelPrompt: prompt, children: options, image: image, imageExt: imageExt,  ending: ending }

    if(validate(levelData)){
    props.updateStory(levelData)
    toast.success("Updated story")
    }
    else{
      toast.error("Data not valid")
    }

    //'Content-Type': 'multipart/form-data' header needed for axios submission
  }

  function validate(data){

    function invalidLoopBack(){
     return data.children?.filter(val=> val.loopBack && val.loopBackText.replace(/\s/g, '').length === 0).length>0
    }

    function invalidLevelName(){
      return data?.levelName?.replace(/\s/g, '').length === 0
    }

    function missingPrompt(){
      return data?.levelPrompt?.replace(/\s/g, '').length === 0 
    }

    function missingPhoto(){
      return image == null
    }

    if(invalidLevelName() || missingPrompt() || invalidLoopBack() || missingPhoto()){
      return false;
    }
    return true;
  }

  function setImageDisplay(fileData) {
    let imgtag = document.getElementById("myimage");
    if (fileData && imgtag) {
      let selectedFile = fileData
      let reader = new FileReader();
      imgtag.title = selectedFile.name;
      reader.onload = function (event) {
        // @ts-ignore: Object is possibly 'null'.
        imgtag.src = event.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }
    else {
      imgtag?.removeAttribute('title')
      imgtag?.removeAttribute('src')
    }

  }

  function updateImageLink(storyName, nodeSelected){
    let link = `/game-library/${storyName}/${nodeSelected.id}.png`
    setImageLink(link)
    
  }

  function handleImageChange(e) {
    let selectedFile = e.target.files[0];
    setImage(selectedFile);
    setImageDisplay(selectedFile)
  }

  function updateOptions(opts) {
    setOptions(opts)
  }

  return (
    <Card style={{ width: "700px" }}>
      {/* navbar */}
      <div className="form-group m-2" hidden={!parentId}>
          <Button color="primary" className="btn btn-primary" variant="bordered" onClick={()=>{props.updateCurrNode(parentId)}}><span>&#8592;</span></Button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
      />

{      !props.nodeSelected.loopBack ? <form onSubmit={processSubmission}>
        <div className="form-group  m-2">
          <p>Level Name:</p>
          <Input name="levelName" type="text" className="form-control" id="levelName" errorMessage="input required" placeholder="Enter Level Name" isRequired value={levelName} onChange={(e) => { setLevelName(e.target.value) }} />
        </div>
        <div className="form-group  m-2">
          <p>Prompt:</p>
          <Input name="levelPrompt" type="text" className="form-control" errorMessage="input required"  id="levelPrompt" placeholder="Enter prompt" value={prompt} onChange={(e) => { setPrompt(e.target.value) }} required={true} isRequired/>
        </div>


        <div className="form-group  m-2">
          <p>Image:</p>
          <Input name="levelPic" type="file" accept="image/png, image/jpeg" className="form-control" id="image" onChange={handleImageChange} isRequired />
          <img
            alt=""
            id="myimage"
            width={300}
            src={imageLink}
          />

        </div>

        <Divider />

        <div className="form-check m-2" hidden={ending}>
          <LevelOptions options={options || []} updateOptions={updateOptions} updateCurrNode={props.updateCurrNode} />
        </div>

        <div className="form-check m-2">
            <Checkbox isSelected={ending} onChange={(e) => {setEnding(!ending) }}>Ending</Checkbox>
        </div>

        <div className="form-group m-2">
          <Button type="submit" className="btn btn-primary">Save</Button>
        </div>
      </form>: <p>Loop back prompt, No Input required</p>}
      <Divider />

    </Card>
  )
}