"use client";

import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  stats: {
    totalRepos: number;
    totalStars: number;
    totalForks: number;
    languageCount: number;
    mostUsedLanguage: string | null;
  };
}

export default function StatsCards({
  stats,
}: StatsCardsProps) {
  const items = [
    {
      label: "Repositories",
      value: stats.totalRepos,
    },
    {
      label: "Stars",
      value: stats.totalStars,
    },
    {
      label: "Forks",
      value: stats.totalForks,
    },
    {
      label: "Languages",
      value: stats.languageCount,
    },
    {
      label: "Top Language",
      value: stats.mostUsedLanguage ?? "-",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-5">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              {item.label}
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {item.value}
            </h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}