"use client";

import React from "react";
import { PricingTable } from "@clerk/nextjs";
import { Sparkles, ShieldCheck, Clock } from "lucide-react";

const Page = () => {
  return (
    <div className="relative min-h-screen bg-background px-6 py-20 sm:py-24 transition-colors">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/20 to-primary/0 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gradient-to-tr from-violet-500/10 to-fuchsia-400/10 blur-2xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <div className="text-center mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> New pricing that scales with you
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Choose Your Plan
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Simple, transparent pricing. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="relative">
          <div className="rounded-2xl z-20 border border-border/60 bg-card/60 p-4 sm:p-6 shadow-xl overflow-visible">
            <PricingTable
              appearance={{
                elements: {

                  root: "text-foreground",
                  headerTitle: "text-foreground",
                  headerSubtitle: "text-muted-foreground",
                  planCard:
                    "bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-200 rounded-xl",
                  planName: "text-base sm:text-lg font-semibold text-foreground",
                  planPrice: "text-2xl sm:text-3xl font-extrabold text-foreground",
                  planDescription: "text-sm sm:text-[0.95rem] text-muted-foreground",
                  planFeature: "text-sm",
                  planFeatureIcon: "text-primary",
                  button:
                    "bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium h-10 sm:h-11 text-sm sm:text-base",
                },
              }}
            />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card/70 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Secure checkout</p>
                <p className="text-sm text-muted-foreground">Industry‑standard encryption and best practices.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card/70 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Cancel anytime</p>
                <p className="text-sm text-muted-foreground">No long‑term contracts. Manage billing in app.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card/70 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Transparent pricing</p>
                <p className="text-sm text-muted-foreground">Clear limits and features at every tier.</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          14‑day money‑back guarantee. Taxes may apply at checkout.
        </p>
      </div>
    </div>
  );
};

export default Page;
