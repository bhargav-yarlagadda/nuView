"use client";

import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/tRPC-wrapper";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const page = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const trpc = useTRPC();
  const createProject = useMutation(trpc.projects.create.mutationOptions());

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-500 text-transparent bg-clip-text">
            Lovable AI
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Transform your ideas into reality with AI-powered development
          </p>
        </div>

        {/* Main Input Section */}
        <div className="max-w-xl mx-auto">
          <Card className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg shadow-xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Describe your project
                </label>
                <Input
                  className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your project description..."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-[1.02]"
                onClick={() => {
                  createProject.mutate({
                    value: value,
                  });
                }}
                disabled={createProject.isPending}
              >
                {createProject.isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  "Create Project"
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            {
              title: "AI-Powered",
              description:
                "Leverage cutting-edge AI to accelerate your development",
              icon: "🤖",
            },
            {
              title: "Real-time Preview",
              description: "See your project come to life instantly",
              icon: "👁️",
            },
            {
              title: "Code Generation",
              description: "Get production-ready code automatically",
              icon: "💻",
            },
          ].map((feature, index) => (
            <div key={index} className="group">
              <Card className="p-6 bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
