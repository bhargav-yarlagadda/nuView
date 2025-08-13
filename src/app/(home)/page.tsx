import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Globe, Laptop } from "lucide-react";
import Link from "next/link";

import { Code2, Blocks, Sparkles, GitBranch } from "lucide-react";

const features = [
  {
    title: "Next.js 14",
    description:
      "Start with the latest Next.js features including App Router and Server Components.",
    icon: Blocks,
  },
  {
    title: "TypeScript & Tailwind",
    description:
      "Built-in TypeScript and Tailwind CSS support for modern web development.",
    icon: Code2,
  },
  {
    title: "AI Integration",
    description:
      "Leverage AI capabilities to enhance your development workflow.",
    icon: Sparkles,
  },
  
];

const page = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative space-y-6 flex items-center min-h-screen">
        <div className="container flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <Image
              src="/new-view.svg"
              alt="New View"
              className="mx-auto"
              width={80}
              height={80}
            />
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              A <span className="text-primary">New View</span> on Development
            </h1>
            <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto">
              Transform your development experience with our innovative
              platform. Built for developers, by developers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/project">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-40 sm:py-6">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex h-[200px] flex-col items-start space-y-4 p-6 bg-muted/80 rounded-lg"
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container      sm:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-[42rem]">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to start your journey?
            </h2>
            <p className="text-muted-foreground">
              Join thousands of developers who are already using New View to
              build amazing projects.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/project">
              Start Building Now
              
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default page;
