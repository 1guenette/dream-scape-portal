"use client"
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { redirect } from 'next/navigation'

import {
  Accordion, AccordionItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Divider, Button, Card, CardHeader, CardBody, CardFooter,
  Select, SelectItem, Image, Checkbox
} from "@nextui-org/react";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import {useState} from "react"

export default function Home() {

  const [storyName, setStoryName] = useState(null)


  function updateStoryName(e){
    setStoryName(e.target.value)
  }

  function createStudioSession(){
    console.log("HAHAHA")
    console.log(storyName)
    location.href = `/studio/${storyName}`;
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Create your story</h1>
        <br />
        <br/>
        <div className="form-group  m-2">
          <p>Story Name:</p>
          <Input name="levelName" type="text" className="form-control" id="levelName" errorMessage="input required" placeholder="Enter your story name" onChange={updateStoryName} isRequired />
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          onClick={createStudioSession}
        >
          Other Stories
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          onClick={createStudioSession}
        >
          Create
        </Link>
      </div>
    </section>
  );
}
