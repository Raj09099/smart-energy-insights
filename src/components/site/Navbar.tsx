import { Link } from "@tanstack/react-router";
import { Menu, Zap, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/detection", label: "Detection" },
  { to: "/analysis", label: "Analysis" },
  { to: "/chatbot", label: "AI Chatbot" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
] as const;

/** Sticky, responsive glass navigation bar. */
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient shadow-[var(--shadow-glow)]">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight">
              Volt<span className="text-gradient">Sense</span> AI
            </span>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Detection &amp; Analysis
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground data-[status=active]:bg-muted/70 data-[status=active]:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-105 sm:inline-block"
          >
            Login
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-muted/50 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background/95 px-4 pb-5 pt-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {[...links, { to: "/login", label: "Login" } as const].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground data-[status=active]:bg-muted/70 data-[status=active]:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
