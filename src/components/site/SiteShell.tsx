import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { useScrollReveal } from "@/hooks/use-reveal";

/** Shared page shell: sticky navbar + content + footer + scroll animations. */
export function SiteShell({ children }: { children: ReactNode }) {
  useScrollReveal();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

/** Reusable page header for inner pages. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-6 pt-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
        {eyebrow}
      </p>
      <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {subtitle}
      </p>
    </section>
  );
}
