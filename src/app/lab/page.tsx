import Link from "next/link";

const experiments = [
  {
    slug: "experiment-1",
    title: "Experiment One",
    description: "A brief description of this experiment.",
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
