'use client'
import { Accordion, AccordionItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Divider, Button,Card, CardHeader, CardBody, CardFooter,
    Select, SelectItem
 } from "@nextui-org/react";
import LevelOptions from "./LevelOptions";
import Dropdown from "../dropdown";
import "../graph.css";

// import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react";



export default function StoryForm(data:any, leveOptions:any) {

const options = useState(leveOptions)
const [image, setImage] = useState(null);

function processSubmission(e){

  e.preventDefault()
  console.log("-----------")
  const levelName = e.target.levelName[0].value
  const levelPrompt = e.target.levelPrompt.value

  //'Content-Type': 'multipart/form-data' header needed for axios submission
}

function handleImageChange(e){
  setImage(e.target.files[0]);
}



  return (


      <Card style={{ width: "700px" }}>
        {/* navbar */}

        <form onSubmit={processSubmission}>
          <div className="form-group  m-2">
            <p>Level Name:</p>
            <Input name="levelName" type="text" className="form-control" id="levelName" placeholder="Enter Level Name" />
          </div>
          <div className="form-group  m-2">
            <p>Prompt:</p>
            <Input name="levelPrompt" type="text" className="form-control" id="levelPrompt"  placeholder="Enter prompt" />
          </div>


          <div className="form-group  m-2">
            <p>Image:</p>
            <Input name="levelPic" type="file" accept="image/png, image/jpeg" className="form-control" id="image" onChange={handleImageChange}/>
          </div>

          <Divider/>

          <div className="form-check m-2">
            <LevelOptions data={null}/>
          </div>




          <div className="form-group m-2">
            <Button type="submit" className="btn btn-primary">Save</Button>
          </div>
        </form>
        <Divider />

      </Card>
  )
}