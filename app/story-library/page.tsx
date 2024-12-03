"use client"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue, Button } from "@nextui-org/react";
import { title } from "@/components/primitives";
import axios from "axios";
import { useEffect, useState } from "react";

export default function GameLibrary() {

  const [list, setList] = useState<any>([])

  useEffect(() => {
    axios.get('/api/story-library').then((res) => {
      let list = res.data.list.map((name, i) => { return { key: i, name: name } })
      setList(list)
    })

  }, [])

  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "playCount",
      label: "Play",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Story Library&nbsp;</h1>
        <br />
      </div>


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
