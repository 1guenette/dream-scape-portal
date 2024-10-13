'use client'
import { Accordion, AccordionItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Divider, Button,Card, CardHeader, CardBody, CardFooter,
    Select, SelectItem, Image
 } from "@nextui-org/react";
import LevelOptions from "./LevelOptions";
import Dropdown from "../dropdown";
import "../graph.css";

// import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from "react";

//[{option: "enter the good room", loopBack: false, loopBackText: null}, {option: "enter the bad room", loopBack: true, loopBackText: "bad room is locked"}]


export default function StoryForm(props) {

const [options, setOptions] = useState([])
const [image, setImage] = useState(null);

const [levelName, setLevelName] = useState("")
const [prompt, setPrompt] = useState("")


useEffect(()=>{
  
  setLevelName(props.nodeSelected?.name)
  setPrompt(props.nodeSelected?.levelPrompt || '')
  setOptions(props.nodeSelected?.children)
  setImage(props.nodeSelected?.image)
  setImageDisplay(props.nodeSelected?.image)

}, [props.nodeSelected])

function processSubmission(e){

  e.preventDefault()

  // const levelName = e.target.levelName[0].value
  // const levelPrompt = e.target.levelPrompt.value
  // const image = e.target[2].value
  let levelData = {levelName:levelName, levelPrompt: prompt, children: options, image: image }

  props.updateStory(levelData)

  //'Content-Type': 'multipart/form-data' header needed for axios submission
}

  function setImageDisplay(fileData) {
    let imgtag = document.getElementById("myimage");
    if (fileData) {
        let selectedFile = fileData
        let reader = new FileReader();
        imgtag.title = selectedFile.name;
        reader.onload = function (event) {
          imgtag.src = event.target.result;
        };
        reader.readAsDataURL(selectedFile);
    }
    else {
      console.log("NO IMAGE")
      imgtag?.removeAttribute('title')
      imgtag?.removeAttribute('src')
    }

  }

  function handleImageChange(e) {
    setImage(e.target.files[0]);
    let selectedFile = e.target.files[0];
    setImageDisplay(selectedFile)
  }

function updateOptions(opts){
  setOptions(opts)
}

  return (

      <Card style={{ width: "700px" }}>
        {/* navbar */}

        <form onSubmit={processSubmission}>
          <div className="form-group  m-2">
            <p>Level Name:</p>
            <Input name="levelName" type="text" className="form-control" id="levelName" placeholder="Enter Level Name"  isRequired value={levelName} onChange={(e)=>{setLevelName(e.target.value)}}/>
          </div>
          <div className="form-group  m-2">
            <p>Prompt:</p>
            <Input name="levelPrompt" type="text" className="form-control" id="levelPrompt"  placeholder="Enter prompt" value={prompt} onChange={(e)=>{setPrompt(e.target.value)}}/>
          </div>


          <div className="form-group  m-2">
            <p>Image:</p>
            <Input name="levelPic" type="file" accept="image/png, image/jpeg" className="form-control" id="image" onChange={handleImageChange} isRequired/>
            <img
            id="myimage"
      width={300}
    />
            
          </div>

          <Divider/>
          
          <div className="form-check m-2">
            <LevelOptions options={options || []} updateOptions={updateOptions}/>
          </div>


          <div className="form-group m-2">
            <Button type="submit" className="btn btn-primary">Save</Button>
          </div>
        </form>
        <Divider />

      </Card>
  )
}