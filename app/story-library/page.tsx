"use client"
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import {  Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function GameLibrary() {


    const rows = [
        {
          key: "1",
          name: "Tony Reichert",
          creator: "CEO",
          playCount: "Active",
        },
        {
          key: "2",
          name: "Zoey Lang",
          creator: "Technical Lead",
          status: "Paused",
        },
        {
          key: "3",
          name: "Jane Fisher",
          creator: "Senior Developer",
          status: "Active",
        },
        {
          key: "4",
          name: "William Howard",
          creator: "Community Manager",
          status: "Vacation",
        },
      ];


    const columns = [
        {
          key: "name",
          label: "NAME",
        },
        {
          key: "creator",
          label: "CREATOR",
        },
        {
          key: "playCount",
          label: "PLAY COUNT",
        },
      ];
    
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Story Library&nbsp;</h1>
        <br />
      </div>

      {/* <div className="flex gap-2"> */}

<Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>

      {/* </div> */}
    </section>
  );
}
