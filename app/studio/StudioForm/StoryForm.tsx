'use client'
import { Accordion, AccordionItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Divider, Button,Card, CardHeader, CardBody, CardFooter,
    Select, SelectItem
 } from "@nextui-org/react";
import LevelOptions from "./LevelOptions";
import Dropdown from "../dropdown";
import "../graph.css";

// import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react";

//[{option: "enter the good room", loopBack: false, loopBackText: null}, {option: "enter the bad room", loopBack: true, loopBackText: "bad room is locked"}]


export default function StoryForm(props) {

const [options, setOptions] = useState([])
const [image, setImage] = useState(null);

useEffect(()=>{
  console.log("------")
}, [props.nodeSelected])

function processSubmission(e){

  e.preventDefault()
  const levelName = e.target.levelName[0].value
  const levelPrompt = e.target.levelPrompt.value
  const image = e.target[2].value
  let levelData = {levelName:levelName, levelPrompt: levelPrompt, options: options }

  props.updateStory(levelData)

  //'Content-Type': 'multipart/form-data' header needed for axios submission
}

function handleImageChange(e){
  setImage(e.target.files[0]);
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
            <Input name="levelName" type="text" className="form-control" id="levelName" placeholder="Enter Level Name" isRequired/>
          </div>
          <div className="form-group  m-2">
            <p>Prompt:</p>
            <Input name="levelPrompt" type="text" className="form-control" id="levelPrompt"  placeholder="Enter prompt" isRequired/>
          </div>


          <div className="form-group  m-2">
            <p>Image:</p>
            <Input name="levelPic" type="file" accept="image/png, image/jpeg" className="form-control" id="image" onChange={handleImageChange} isRequired/>
          </div>

          <Divider/>
          
          <div className="form-check m-2">
            <LevelOptions updateOptions={updateOptions}/>
          </div>


          <div className="form-group m-2">
            <Button type="submit" className="btn btn-primary">Save</Button>
          </div>
        </form>
        <Divider />

      </Card>
  )
}