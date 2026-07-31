import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Mail, MapPin, Phone, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader, SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VoltSense AI Electricity System" },
      {
        name: "description",
        content:
          "Get in touch with the VoltSense AI team for demos, deployment support or partnership enquiries.",
      },
      { property: "og:title", content: "Contact — VoltSense AI" },
      {
        property: "og:description",
        content: "Reach the team behind the AI electricity detection system.",
      },
    ],
  }),
  component: ContactPage,
});

const details = [
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: Mail, label: "Email", value: "support@voltsense.ai" },
  { icon: MapPin, label: "Address", value: "Block C, Energy Park, Pune 411045, India" },
];

function ContactPage() {
  const [loading, setLoading] = useState(false);

  // Ready for Flask: POST /api/contact { name, email, subject, message }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent", {
        description: "We'll get back to you within one business day.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1100);
  };

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the VoltSense team"
        subtitle="Questions about deployment, model training or integrating your own meters? Send us a note."
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <form onSubmit={handleSubmit} className="reveal glass p-7 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Your full name"
                className="mt-2 w-full rounded-xl border border-input bg-muted/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/70 focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div>
              <label htmlFor="cemail" className="text-sm font-medium">
                Email
              </label>
              <input
                id="cemail"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="mt-2 w-full rounded-xl border border-input bg-muted/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/70 focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                required
                placeholder="What is this about?"
                className="mt-2 w-full rounded-xl border border-input bg-muted/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/70 focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Tell us about your setup…"
                className="mt-2 w-full resize-none rounded-xl border border-input bg-muted/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/70 focus:ring-2 focus:ring-ring/40"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.02] disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizonal className="h-4 w-4" />
            )}
            {loading ? "Sending…" : "Send Message"}
          </button>
        </form>

        <div className="space-y-6">
          <div className="reveal glass p-7">
            <h2 className="text-lg font-semibold">Contact details</h2>
            <ul className="mt-5 space-y-4">
              {details.map((d) => (
                <li key={d.label} className="flex gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-gradient">
                    <d.icon className="h-4.5 w-4.5 text-primary-foreground" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                      {d.label}
                    </span>
                    <span className="text-sm">{d.value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map placeholder — replace with an embedded Google Map iframe */}
          <div className="reveal glass grid h-64 place-items-center overflow-hidden">
            <div className="grid-lines relative grid h-full w-full place-items-center">
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8 animate-pulse-glow text-accent" />
                <p className="mt-2 text-sm font-medium">Google Map placeholder</p>
                <p className="text-xs text-muted-foreground">
                  Energy Park, Pune · 18.5204° N, 73.8567° E
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
