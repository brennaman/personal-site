import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
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
      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <Link href="/about">About me</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/lab">View experiments</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link
            href="https://www.linkedin.com/in/paulbrennaman"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5"
          >
            <Linkedin className="size-3.5 shrink-0 opacity-70" aria-hidden="true" />
            <span>LinkedIn</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
