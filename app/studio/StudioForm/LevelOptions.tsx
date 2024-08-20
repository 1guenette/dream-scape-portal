'use client'
import {
    Accordion, AccordionItem, Table, TableHeader, TableColumn, TableBody,
    TableRow, TableCell, Input, Divider, Button, Card, CardHeader, CardBody, CardFooter,
    Select, SelectItem
} from "@nextui-org/react";
import Dropdown from "../dropdown";
import "../graph.css";
import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css"



export const existingOptions = [
    {
        "id": 1,
        "description": "read note",
        "redirect": false,
        "popupNote": "You are not able to read the note. It is too dark",
        "next": "2"
    },
    {
        "id": 2,
        "description": "try to talk to friend",
        "redirect": false,
        "popupNote": "Your friend is too weak to speak, His brittle hand timidly waves the note",
        "next": "2"
    },
    {
        "id": 3,
        "description": "light match",
        "redirect": true,
        "next": "4"
    },
    {
        "id": 4,
        "description": "Escape through tunnel",
        "redirect": true,
        "next": "3"
    }
]


export default function LevelOptions(data: any) {

    const [options, setOptions] = useState(existingOptions) //TODO: replace with inherited options

    function generateExistingOptions(){
        options.map((opt)=>{
            return <><div className="col-span-10 ...">
                    <Input type="text" className="form-control" id="levelName" placeholder="Enter option" defaultValue="escape me"/>
                </div>

                <div className="col-start-12 ...">
                    <div className="form-check m-2">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <p className="form-check-label">Loop Back</p>
                    </div>
                </div></>
        })
    }

    return (



        <div>

            <div className="row">
                <p>Options:</p>
            </div>

            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-10 ...">
                    <Input className="form-control" id="levelName" placeholder="Enter option" defaultValue="testDefault"/>
                </div>

                <div className="col-start-12 ...">
                    <div className="form-check m-2">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <p className="form-check-label">Loop Back</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
                <div className="col-start-12 ...">
                    <Button>Add Option</Button>
                </div>
            </div>
        </div>

    )
}