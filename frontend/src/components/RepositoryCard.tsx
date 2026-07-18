"use client";

import { motion } from "framer-motion";
import {
  Star,
  GitFork,
  Calendar,
  ArrowUpRight,
  Code2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RepositoryCardProps {
  repo: {
    id: number;
    name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    html_url: string;
    updated_at: string;
  };
}

export default function RepositoryCard({
  repo,
}: RepositoryCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
    >
      <Card className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-card transition-all duration-300 hover:border-primary hover:shadow-[0_0_40px_rgba(47,129,247,0.25)]">
        <CardContent className="flex h-full flex-col p-6">
          {/* Header */}
          <div className="mb-5 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3 transition-colors duration-300 group-hover:bg-primary/20">
                <Code2 className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {repo.name}
                </h3>

                {repo.language && (
                  <Badge className="mt-2 rounded-full bg-secondary text-white">
                    {repo.language}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mb-6 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
            {repo.description ??
              "No description provided for this repository."}
          </p>

          {/* Stats */}
          <div className="mb-6 flex items-center justify-between rounded-xl border border-white/5 bg-background/40 p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-semibold">
                {repo.stargazers_count}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <GitFork className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">
                {repo.forks_count}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {new Date(
                  repo.updated_at
                ).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Footer */}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-white"
          >
            <span>Open Repository</span>

            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
}