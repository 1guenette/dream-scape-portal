import { title } from "@/components/primitives";

export default function Support() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div >
        <h1 className={title()}>Support Us</h1>
      </div>
      <div>
        <p>While Dreamscape will always be open source and free, it takes work to host, maintain, and improve the experience for 
          creatives and players alike
        </p>
        <p>This project is made possible thanks to supporters like you</p>
        <br/>
        <p>If you'd like to support us, consider a donation</p>
      </div>

    </section>
  );
}
