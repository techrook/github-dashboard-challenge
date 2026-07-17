"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork } from "lucide-react";

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
    <Card className="transition-shadow hover:shadow-lg">
      <CardContent className="space-y-4 p-6">
        <div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-primary hover:underline"
          >
            {repo.name}
          </a>

          <p className="mt-2 text-sm text-muted-foreground">
            {repo.description || "No description"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {repo.language && (
            <Badge>{repo.language}</Badge>
          )}

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            {repo.stargazers_count}
          </div>

          <div className="flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            {repo.forks_count}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Updated{" "}
          {new Date(repo.updated_at).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}