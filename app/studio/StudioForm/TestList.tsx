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

function TestList() {
  const [options, setOptions] = useState<any[]>([])

  // Function to add a new empty input field to the list
  function addOption() {
    setOptions([...options, { input: '', loopBack: false, loopBackText: '' }]); // Adds an empty input field
  };

  function handleInputChange(index, value) {
    let newOptions = options.map((opt, i) => {
      if (i === index) {
        let updatedOption = opt
        updatedOption.input = value
        return updatedOption
      }
      else {
        return opt
      }
    })
    setOptions(newOptions)
  };

  function deleteOption(index) {
    const newInputs = options.filter((_, i) => i !== index);
    setOptions(newInputs);
  };

  function updateLoopBack(index, value) {

    let newOptions = options.map((opt, i) => {
      if (i === index) {
        let updatedOption = opt
        updatedOption.loopBack = !updatedOption.loopBack
        return updatedOption
      }
      else {
        return opt
      }
    })
    setOptions(newOptions)
  }

  function updateLoopBackInput(index, value) {
    let newOptions = options.map((opt, i) => {
      if (i === index) {
        let updatedOption = opt
        updatedOption.loopBackText = value
        return updatedOption
      }
      else {
        return opt
      }
    })
    setOptions(newOptions)
  };


  return (
    <div>
      <Button onClick={addOption}>Add Input</Button>

      {options.map((option, index) => (
        <>
          <div className="col-start-1 col-span-5 ..." >
            <Input
              type="text"
              value={option.input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder="Enter value"
            />
          </div>
          <div className="col-start-6 ...">
            <div className="grid grid-cols gap-1">
              <div className="col-start-1 ...">
                <div className="form-check m-2">
                  <Checkbox isSelected={option.loopBack} onChange={(e) => updateLoopBack(index, e.target.value)} value={option.loopBack}>Loop Back</Checkbox>
                </div>
              </div>

              <div className="col-start-6 ..." hidden={!option.loopBack}>
                <Input type="text" className="form-control" id="levelName" placeholder="Enter option" onChange={(e) => updateLoopBackInput(index, e.target.value)} value={option.loopBackText}/>
              </div>
            </div>
          </div>
          <div className="col-start-11 ...">
            <Button color="danger" variant="bordered" onClick={() => deleteOption(index)}>Delete</Button>
          </div>
        </>

      ))}
    </div>
  );
};
export default TestList;