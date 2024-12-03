"use client"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue, Button, Modal, ModalBody, ModalHeader, ModalFooter,ModalContent, useDisclosure } from "@nextui-org/react";
import { title } from "@/components/primitives";
import axios from "axios";
import { useEffect, useState } from "react";

export default function GameLibrary() {

  const [list, setList] = useState<any>([])
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [gameSelection, setGameSelection] = useState<any>(null)

  useEffect(() => {
    axios.get('/api/story-library').then((res) => {
      let list = res.data.list.map((name, i) => { return { key: i, name: name } })
      setList(list)
    })

  }, [])

  const columns = [
    {
      key: "Name",
      label: "NAME",
    },
    {
      key: "playCount",
      label: "Actions",
    },
  ];

function onDelete(fileName){

  console.log("PUT DELETE FUNCTION HERE")
  console.log(fileName)
  axios.delete(`/api/studio/${fileName}`).then((res)=>{
    setGameSelection(null)
    let updatedList = list.filter(v => v.name !== fileName )
    setList(updatedList)
  })
  .catch(err=>{

  })
  
}


  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Story Library&nbsp;</h1>
        <br />
      </div>

      <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Story</ModalHeader>
              <ModalBody>
                <p> 
                  Are you sure you want to delete your story?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={onClose} onClick={()=>onDelete(gameSelection)}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>



      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody>

          {
            list.map(val =>
              <TableRow key={val.key}>
                <TableCell>{val.name}</TableCell>
                <TableCell>
                  <Button color="primary" variant="ghost" onClick={() => { window.location.href = `/game/${val.name}` }}>Play</Button>
                  <Button color="primary" variant="ghost" onClick={() => { window.location.href = `/studio/${val.name}` }}>Edit</Button>
                  <Button color="danger" variant="ghost"  onClick={()=>setGameSelection(val.name)} onPress={onOpen}>Delete</Button>
                </TableCell>
              </TableRow>
            )
          }

        </TableBody>
      </Table>

      {/* </div> */}
    </section>
  );
}
