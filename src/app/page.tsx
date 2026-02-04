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
      <h1 className="text-4xl font-bold tracking-tight">Hello, I'm Paul B.</h1>
      <p className="text-lg text-muted-foreground leading-relaxed">
        Welcome to my corner of the internet. I build things and share what I learn.
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
