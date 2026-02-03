import Link from "next/link";
import { notFound } from "next/navigation";

const experiments: Record<string, { title: string; content: string }> = {
  "experiment-1": {
    title: "Experiment One",
    content: "This is the first experiment. Replace this with your actual content.",
  },
  "experiment-2": {
    title: "Experiment Two",
    content: "This is the second experiment. Replace this with your actual content.",
  },
};

export function generateStaticParams() {
  return Object.keys(experiments).map((slug) => ({ slug }));
}

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experiment = experiments[slug];

  if (!experiment) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/lab"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back to Lab
      </Link>
      <h1 className="text-3xl font-bold tracking-tight">{experiment.title}</h1>
      <p className="text-muted-foreground leading-relaxed">{experiment.content}</p>
    </div>
  );
}
