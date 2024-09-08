'use client'
import {
    Accordion, AccordionItem, Table, TableHeader, TableColumn, TableBody, Checkbox,
    TableRow, TableCell, Input, Divider, Button, Card, CardHeader, CardBody, CardFooter,
    Select, SelectItem
} from "@nextui-org/react";
import "../graph.css";
import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css"


export default function LoopBackOption(props: any) {

    const [checked, setChecked] = useState(props.loopBack)

    // useEffect(()=>{

    // }, [props.loopBack])


    function updateCheckbox(){

        setChecked(!checked)
        props.updateLoopBack(props.index, !checked)

    }

    function updateInput(e){
        props.updateLoopBackInput(props.index, e.target.value)
    }

    
    return (
        <>
            <div className="col-start-10 ...">
                <div className="form-check m-2">
                    <Checkbox defaultSelected={props.loopBack}  onClick={updateCheckbox} >Loop Back</Checkbox>
                </div>
            </div>

            <div className="col-start-11 ..." hidden={!checked}>
                <Input type="text" className="form-control" id="levelName" placeholder="Enter option" onChange={updateInput}/>
            </div>
        </>
    )
}