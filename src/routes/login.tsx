import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, Lock, Mail, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CircuitBackground } from "@/components/site/CircuitBackground";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — VoltSense AI Electricity Analysis" },
      {
        name: "description",
        content:
          "Sign in to the VoltSense AI dashboard to monitor electrical telemetry and run fault detection.",
      },
      { property: "og:title", content: "Login — VoltSense AI" },
      {
        property: "og:description",
        content: "Secure access to your AI electricity monitoring workspace.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Ready for Flask: POST /api/auth/login { email, password }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Signed in", {
        description: "Demo session started — backend not connected yet.",
      });
      navigate({ to: "/detection" });
    }, 1200);
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-12">
      <CircuitBackground dense />

      <div className="relative w-full max-w-md">
        <div className="glass p-8 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient shadow-[var(--shadow-glow)]">
              <Zap className="h-7 w-7 text-primary-foreground" />
            </span>
            <h1 className="mt-5 text-2xl font-semibold tracking-tight">
              Volt<span className="text-gradient">Sense</span> AI
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your electricity intelligence dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="operator@voltsense.ai"
                  className="w-full rounded-xl border border-input bg-muted/40 py-3 pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/70 focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative mt-2">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-input bg-muted/40 py-3 pl-10 pr-11 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/70 focus:ring-2 focus:ring-ring/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-accent"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-muted-foreground">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-input bg-muted/40 accent-primary"
                />
                Remember me
              </label>
              <a href="#" className="text-accent transition-opacity hover:opacity-80">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.02] disabled:opacity-70"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Authenticating…" : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/contact" className="text-accent hover:opacity-80">
              Request access
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-accent">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
