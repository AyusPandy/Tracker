import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Services() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 animate-in slide-in-from-top-4 fade-in duration-700 flex flex-col items-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Our products.</h1>
        <p className="mt-3 text-base text-muted-foreground max-w-sm">Solutions designed for modern businesses. Contact with us today for more infomation.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="group relative rounded-xl bg-accent/70 p-6 shadow-xl transition-all hover:bg-accent hover:-translate-y-1 hover:shadow-xl">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <span className="text-muted-foreground font-medium">{i}</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">Service Element {i}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We provide cutting edge implementation for tracking, analytics, and user engagement metrics directly within your workflow.
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center pt-10">
        <Button onClick={() => window.location.href="/dashboard"}>
          Go to dashboard
          <ArrowUpRight className="size-4 ml-1.5 opacity-60" />
        </Button>
        <Button variant="ghost" onClick={() => window.location.href="/"}>
          Go to home
          <ArrowRight className="size-4 ml-1.5 opacity-50" />
        </Button>
      </div>
    </div>
  );
}
