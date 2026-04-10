import { ArrowUpRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-in slide-in-from-bottom-10 fade-in duration-700">
      <h1 className="text-4xl font-bold tracking-tight mb-8 text-foreground">Us</h1>
      <div className="prose prose-invert border-l-2 border-primary/20 pl-6 space-y-6">
        <p className="text-muted-foreground leading-relaxed">
          We are dedicated to building minimal, blazing fast software. Every interaction counts, which is why we trace behavior to provide unparalleled experiences.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Our core philosophy orbits around simplicity, elegance, and raw performance. No fluff, just results.
        </p>
        <Link to="/services">
        <Button variant="ghost" className="text-blue-500 p-0 hover:text-blue-400 hover:bg-transparent h-fit">
            Learn more
            <ArrowUpRight className="size-4 opacity-70 ml-1.5" />
        </Button>
        </Link>
      </div>
    </div>
  );
}
