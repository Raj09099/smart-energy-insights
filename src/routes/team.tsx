import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Twitter, UserRound } from "lucide-react";
import { PageHeader, SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — VoltSense AI Electricity System" },
      {
        name: "description",
        content:
          "Meet the engineers, data scientists and designers behind the AI electricity detection and analysis system.",
      },
      { property: "og:title", content: "Team — VoltSense AI" },
      {
        property: "og:description",
        content: "The people building AI-powered electricity intelligence.",
      },
    ],
  }),
  component: TeamPage,
});

const team = [
  { name: "Aarav Mehta", role: "Project Lead & Full-Stack Engineer", email: "aarav@voltsense.ai" },
  { name: "Diya Sharma", role: "Machine Learning Engineer", email: "diya@voltsense.ai" },
  { name: "Rohan Iyer", role: "Data Engineer", email: "rohan@voltsense.ai" },
  { name: "Sara Khan", role: "Electrical Systems Analyst", email: "sara@voltsense.ai" },
  { name: "Kabir Nair", role: "Backend Developer (Flask)", email: "kabir@voltsense.ai" },
  { name: "Meera Joshi", role: "UI/UX Designer", email: "meera@voltsense.ai" },
];

function TeamPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Team"
        title="The people behind VoltSense"
        subtitle="A cross-disciplinary team of ML engineers, electrical analysts and designers building dependable energy intelligence."
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {team.map((m, i) => (
          <article
            key={m.email}
            className="reveal glass glass-hover p-7 text-center"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            {/* Photo placeholder — swap for a real image when available */}
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-border bg-brand-gradient p-[2px]">
              <div className="grid h-full w-full place-items-center rounded-full bg-background/80">
                <UserRound className="h-10 w-10 text-accent" />
              </div>
            </div>

            <h2 className="mt-5 text-lg font-semibold">{m.name}</h2>
            <p className="mt-1 text-sm text-secondary">{m.role}</p>
            <a
              href={`mailto:${m.email}`}
              className="mt-2 inline-block text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              {m.email}
            </a>

            <div className="mt-5 flex justify-center gap-2">
              {[Linkedin, Twitter, Github, Mail].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  aria-label={`${m.name} social link`}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-muted/40 text-muted-foreground transition-all hover:-translate-y-1 hover:border-accent/50 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
