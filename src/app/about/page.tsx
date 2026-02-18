import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">About Me</h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground leading-relaxed">
            I&apos;m a Software Engineering Leader with deep experience building and leading teams that deliver platforms tied directly to business outcomes. 
            I&apos;ve spent the last several years at The Home Depot leading full-stack engineering teams responsible for revenue-driving systems and internal developer platforms.
          </p>
          
          <p className="text-muted-foreground leading-relaxed">
            Most recently, I led the team behind ProAssist, a sales enablement platform serving 2,300+ stores nationwide. 
            We drove Pro managed account sales from $5M to $590M+ by FY2025, owning the full stack from React frontend to platform APIs and downstream integrations.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Before that, I built enterprise cloud enablement platforms that standardized secure adoption of GCP and Azure across the organization. 
            My work spanned GitOps-based infrastructure automation, developer portals, policy-as-code guardrails, and Kubernetes-based deployment systems.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            I&apos;m technical by background—comfortable in React, Go, Node.js, TypeScript—but I focus on growing engineers, unblocking delivery, and aligning teams around shared outcomes. 
            I believe in trust, exposure, and accountability as the foundation for great engineering teams.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <h2 className="text-xl font-semibold mb-4">What I Do</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>Lead engineering teams through complex, high-impact delivery</li>
            <li>Build internal platforms and developer tooling at scale</li>
            <li>Drive architecture decisions and long-term technical strategy</li>
            <li>Partner cross-functionally to align eng work with business priorities</li>
            <li>Mentor engineers and create environments where they can grow</li>
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <h2 className="text-xl font-semibold mb-4">Tech I Work With</h2>
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-2">Frontend & APIs</p>
              <p>React, TypeScript, JavaScript, Node.js, Go</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Cloud & Platform</p>
              <p>GCP, Azure, Terraform, Kubernetes, GitHub Actions</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Platform Engineering</p>
              <p>GitOps, IaC, CI/CD, Developer Portals</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Leadership</p>
              <p>Team Development, Delivery, Cross-Functional Alignment</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-muted-foreground leading-relaxed">
            Outside of work, I experiment with new tools and frameworks—this site is part of that. 
            Check out the <Link href="/lab" className="text-primary hover:underline">lab</Link> for side projects and experiments.
          </p>
        </div>
      </div>
    </div>
  );
}
