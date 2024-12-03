"use client"
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { redirect } from 'next/navigation'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Input, Card} from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { useState } from "react"

export default function Home() {

  const [storyName, setStoryName] = useState("")

  function updateStoryName(e) {
    setStoryName(e.target.value.replaceAll(" ", "_"))
  }

  function createStudioSession() {
    if(storyName !== null && storyName){
    axios.post(`/api/studio`, { name: storyName }).then(async (res: any) => {
      location.href = `/studio/${storyName}`;
    })
      .catch(err => {
        if (err.response.status === 403) {
          toast.error("Story name already exists")
        } else {
          toast.error("Failed to create story")
        }
      });
    }
  }

  return (
    <main className="dark text-foreground bg-background">
      <Card className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="dark"
        />
        <div className="inline-block max-w-xl text-center justify-center">
          <h1 className={title()}>Create your story</h1>
          <br />
          <br />
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
            onClick={() => { }}
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
      </Card>
    </main>

  );
}
