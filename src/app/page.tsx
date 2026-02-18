import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Image
          src="/headshot.png"
          alt="Paul B."
          width={200}
          height={200}
          priority
          className="rounded-full shadow-lg"
        />
      </div>
      <h1 className="text-4xl font-bold tracking-tight">Hello, I&apos;m Paul Brennaman</h1>
      <p className="text-xl text-muted-foreground leading-relaxed">
        Software Engineering Leader
      </p>
      <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
        I lead engineering teams that build platforms and systems tied to real business outcomes. 
        Most recently at The Home Depot, driving revenue-linked products and cloud enablement platforms.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/about">About me</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/lab">View experiments</Link>
        </Button>
      </div>
    </div>
  );
}
