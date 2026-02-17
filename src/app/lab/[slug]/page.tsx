import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type ExperimentContent = {
  title: string;
  component: () => React.ReactElement;
};

const experiments: Record<string, ExperimentContent> = {
  "ai-assistant-automation": {
    title: "Building with AI Assistants",
    component: () => (
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed">
          I've been experimenting with OpenClaw, an AI assistant framework that runs locally and integrates with real-world tools and services. 
          Instead of treating AI as just a chatbot, OpenClaw can execute commands, manage infrastructure, and automate workflows across Google Workspace, GitHub, and more.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What I Built</h2>
        <p className="text-muted-foreground">A personal AI assistant that can:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Manage Google Workspace</strong>: Send emails, check calendar availability, create contacts, and search Drive—all via the gog CLI tool</li>
          <li><strong>Automate GitHub workflows</strong>: Clone repos, create branches, make code changes, and submit pull requests on my behalf</li>
          <li><strong>Update this website</strong>: My assistant wrote the About page content by reading my resume from Google Drive and creating a PR with professionally-written copy</li>
          <li><strong>Search and fetch web content</strong>: Research job postings, fetch documentation, and summarize findings</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Why This Matters</h2>
        <p className="text-muted-foreground">
          Traditional automation requires writing scripts for every task. With an AI assistant that understands natural language and has access to CLI tools, 
          I can say "update my About page based on my resume" and it handles:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
          <li>Reading the resume from Google Drive</li>
          <li>Analyzing the content</li>
          <li>Cloning the repo</li>
          <li>Making appropriate edits to multiple files</li>
          <li>Creating a PR with a detailed description</li>
        </ol>
        <p className="text-muted-foreground mt-4">All in one conversational exchange.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Technical Architecture</h2>
        
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div>
            <p className="font-semibold text-foreground mb-2">Core Stack:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              <li>OpenClaw (AI assistant framework)</li>
              <li>Claude Sonnet 4 (primary model)</li>
              <li>Grok 4 (secondary agent for specific tasks)</li>
            </ul>
          </div>
          
          <div>
            <p className="font-semibold text-foreground mb-2">Integrations:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
              <li>Google Workspace via gog CLI (Gmail, Calendar, Drive, Contacts)</li>
              <li>GitHub via gh CLI (repos, PRs, issues, actions)</li>
              <li>Web search and content fetching</li>
            </ul>
          </div>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg my-6">
          <p className="font-semibold text-foreground mb-2">Security Model:</p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
            <li>Runs entirely locally (no third-party API proxies)</li>
            <li>OAuth-based authentication for Google services</li>
            <li>GitHub token with repo-scoped permissions</li>
            <li>All credentials stored locally, never in code</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Real Examples</h2>
        
        <div className="space-y-6">
          <div className="border-l-2 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-2">Example 1: Calendar + Email Workflow</h3>
            <p className="text-sm text-muted-foreground mb-2">I asked: "What time slots do I have available tomorrow?"</p>
            <p className="text-sm text-muted-foreground">The assistant:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground mt-2">
              <li>Queried my shared Google Calendar</li>
              <li>Parsed the events</li>
              <li>Sent a formatted email with openings</li>
            </ul>
          </div>

          <div className="border-l-2 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-2">Example 2: Site Updates</h3>
            <p className="text-sm text-muted-foreground mb-2">I asked: "Update my About page with content from my resume in Google Drive"</p>
            <p className="text-sm text-muted-foreground">The assistant:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground mt-2">
              <li>Downloaded my resume (Word doc) from Drive</li>
              <li>Extracted and analyzed the content</li>
              <li>Cloned the personal-site repo</li>
              <li>Rewrote both the About and Home pages with professional copy</li>
              <li>Created a PR with detailed commit messages</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">I reviewed, merged, and the changes went live.</p>
          </div>

          <div className="border-l-2 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-2">Example 3: Job Research</h3>
            <p className="text-sm text-muted-foreground mb-2">I asked: "Find the PGA Tour Superstore senior engineering manager opening"</p>
            <p className="text-sm text-muted-foreground">The assistant:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground mt-2">
              <li>Searched the web for the job posting</li>
              <li>Scraped the listing from a job board</li>
              <li>Extracted key requirements (Salesforce Commerce Cloud, CI/CD, Kubernetes)</li>
              <li>Emailed the details for review</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">All without me leaving the chat.</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Why I'm Excited About This</h2>
        <p className="text-muted-foreground">
          As someone who's built internal developer platforms at scale, I'm fascinated by how AI can be the next evolution of self-service tooling. 
          Instead of building UIs and APIs for every workflow, an AI agent can:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
          <li>Understand intent from natural language</li>
          <li>Orchestrate multiple tools and services</li>
          <li>Handle edge cases conversationally</li>
          <li>Learn from feedback in real-time</li>
        </ul>
        <p className="text-muted-foreground mt-4 italic">It's like having a platform engineer on call 24/7.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What's Next</h2>
        <p className="text-muted-foreground">I'm exploring:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
          <li>Multi-agent workflows (separate agents for different contexts)</li>
          <li>Cron-based automation (scheduled check-ins, reminders)</li>
          <li>Memory and context management (how agents remember past interactions)</li>
          <li>Security hardening for production use</li>
        </ul>
        <p className="text-muted-foreground mt-6">
          This is early-stage experimentation, but it's a glimpse of how AI assistants could change how we interact with infrastructure and tooling.
        </p>

        <div className="mt-8 pt-6 border-t border-border text-sm text-muted-foreground">
          <p><strong>Tech Stack:</strong> OpenClaw • Claude Sonnet 4 • Grok 4 • gog CLI • gh CLI</p>
          <p><strong>Languages:</strong> TypeScript • Go • Bash</p>
          <p><strong>Platforms:</strong> Google Workspace • GitHub • Web APIs</p>
        </div>
      </div>
    ),
  },
  "experiment-2": {
    title: "Experiment Two",
    component: () => (
      <p className="text-muted-foreground">This is the second experiment. Replace this with your actual content.</p>
    ),
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

  const ContentComponent = experiment.component;

  return (
    <div className="space-y-6">
      <Link
        href="/lab"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; Back to Lab
      </Link>
      <h1 className="text-3xl font-bold tracking-tight">{experiment.title}</h1>
      <ContentComponent />
    </div>
  );
}
