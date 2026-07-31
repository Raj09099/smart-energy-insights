import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Twitter, Zap } from "lucide-react";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/detection", label: "Detection" },
  { to: "/analysis", label: "Analysis" },
  { to: "/about", label: "About" },
] as const;

const services = [
  "AI Fault Detection",
  "Consumption Analytics",
  "Live Monitoring",
  "Smart Reports",
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="text-sm font-semibold">
              Volt<span className="text-gradient">Sense</span> AI
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Machine-learning powered electricity fault detection, consumption
            analysis and energy intelligence for modern grids.
          </p>
          <div className="mt-5 flex gap-2">
            {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-muted/40 text-muted-foreground transition-all hover:-translate-y-1 hover:border-accent/50 hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Get in touch</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>support@voltsense.ai</li>
            <li>+91 98765 43210</li>
            <li>Block C, Energy Park, Pune 411045</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} VoltSense AI. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-accent">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-accent">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
