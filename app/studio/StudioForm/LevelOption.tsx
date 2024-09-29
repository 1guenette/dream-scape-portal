'use client'
import {
    Accordion, AccordionItem, Table, TableHeader, TableColumn, TableBody, Checkbox,
    TableRow, TableCell, Input, Divider, Button, Card, CardHeader, CardBody, CardFooter,
    Select, SelectItem
} from "@nextui-org/react";
import Dropdown from "../dropdown";
import "../graph.css";
import { useEffect, useState } from "react";
import LoopBackOption from "./LoopBackOption";
import { skip } from "node:test";
// import "bootstrap/dist/css/bootstrap.min.css"




export default function LevelOption(props) {

    let [optionText, setOptionText] = useState()
    let [loopBack, setLoopback] = useState(false)
    let [loopBackText, setLoopbackText] = useState()

    function updateLoopBack(index, loopVal) {

    }

    function updateLoopBackInput(index, input) {

    }

    function updateOptionInput(e){
        setOptionText(e.target.value)
    }

    function deleteOption(){
        props.deleteOption()
    }

    return (
        <>
        <div className="col-start-1 col-span-5 ...">
            <Input  type="text" className="form-control" placeholder="Enter option"  onChange={updateOptionInput}/>
        </div>
        <div className="col-start-6 ...">
            <LoopBackOption updateLoopBack={updateLoopBack} updateLoopBackInput={updateLoopBackInput} />
        </div>
        <div className="col-start-11 ..."> 
        <Button color="danger" variant="bordered" onClick={deleteOption}>Delete</Button>
        </div>
        </>

    )
}