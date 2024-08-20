import { title } from "@/components/primitives";

export default function AboutPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div >
        <h1 className={title()}>About</h1>
      </div>
      <div>
        <p>Dreamscape is an open source choose-your-own adventure game, allowing artists and story tellers to generate interactive stories</p>
        <br/>
        <br/>
        <p>Happy birthday Robbie, stay creative and artistic</p>
      </div>

    </section>
  );
}
