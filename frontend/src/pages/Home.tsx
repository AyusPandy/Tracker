import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
          Get started.
        </h1>
        <p className="mx-auto text-muted-foreground sm:text-base leading-relaxed max-w-md">
          This app tracks every interaction and activity in the background and show the data in dashboard.
        </p>
      </div>
      <div className="group flex flex-col gap-2 justify-center items-center">
        <Link to="/dashboard">
          <Button className="w-fit">
              Get Started
              <ArrowRight className="size-4 ml-1.5 opacity-80"/>
          </Button>
        </Link>
        <Link to="/about">
          <Button variant="ghost" className="text-blue-500 hover:text-blue-400">
              Learn more about us
              <ArrowUpRight className="size-4 ml-1.5 opacity-70" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
