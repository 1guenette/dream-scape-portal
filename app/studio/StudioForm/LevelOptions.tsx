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
// import "bootstrap/dist/css/bootstrap.min.css"




export default function LevelOptions(props) {



    const [options, setOptions] = useState([]) //TODO: replace with inherited options
    
    const updateLoopBack = (index, loopVal)=> {
        console.log("XXXX")
        let updateOptions = options
        updateOptions[index].loopBack = loopVal
        setOptions(updateOptions)
        props.updateOptions(updateOptions)
        // displayOptions()
        
    }

    function updateLoopBackInput(index, input) {
        console.log("YYYYY")
        let updateOptions = options
        updateOptions[index].loopBackText = input
        setOptions(updateOptions)
        props.updateOptions(updateOptions)
        // displayOptions()

    }

    function updateOptionInput(e){
        console.log("ZZZZ")

        let updateOptions = options
        updateOptions[e.target.id].option = e.target.value
        setOptions(updateOptions)
        props.updateOptions(updateOptions)
    }



    //TODO: Make separate component for level option
    function displayOptions() {
        return options.map((opt, i) => {
            return <>
                <div className="col-span-9 ...">
                    <Input key={i} index={i} type="text" className="form-control" id={i} placeholder="Enter option" defaultValue={opt.option} onChange={updateOptionInput}/>
                </div>
                    <LoopBackOption index={i} loopBack={opt.loopBack} updateLoopBack={updateLoopBack} updateLoopBackInput={updateLoopBackInput} inputValue={opt.option}/>
                </>
        })
    }

    function addOption(){
        setOptions([...options, {option: null, loopBack: false, loopBackText: null}])
    }

    return (



        <div>
            <div className="row">
                <p>Options:</p>
            </div>

            <div className="grid grid-cols gap-4">
                {displayOptions()}
            </div>

            <div className="grid grid-cols-4 gap-2">
                <div className="col-start-12 ...">
                    <Button onClick={addOption}>Add Option</Button>
                </div>
            </div>
        </div>

    )
}