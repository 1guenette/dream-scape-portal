'use client'
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className={title()}>Welcome to&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>Osomnium&nbsp;</h1>
        <br />
        
        <h2 className={subtitle({ class: "mt-4" })}>
          A creative art story for all...
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          onClick={() => router.push('/studio')}
        >
          Create
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          onClick={() => router.push('/game-library')}
        >
          Play
        </Link>
      </div>
    </section>
  );
}
