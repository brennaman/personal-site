import Link from "next/link";

const experiments = [
  {
    slug: "ai-assistant-automation",
    title: "Building with AI Assistants",
    description: "Using OpenClaw to automate Google Workspace, GitHub, and personal infrastructure with AI-driven workflows.",
  },
  {
    slug: "experiment-2",
    title: "Experiment Two",
    description: "Another experiment exploring new ideas.",
  },
];

export default function LabPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lab</h1>
        <p className="text-muted-foreground mt-2">
          A collection of experiments and side projects.
        </p>
      </div>
      <div className="grid gap-4">
        {experiments.map((exp) => (
          <Link
            key={exp.slug}
            href={`/lab/${exp.slug}`}
            className="block p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <h2 className="font-medium">{exp.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
