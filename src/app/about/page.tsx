export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p className="text-muted-foreground leading-relaxed">
          I'm a developer passionate about building great products.
          This site is where I share my work and experiments.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Feel free to explore the lab for my latest experiments and side projects.
        </p>
      </div>
    </div>
  );
}
