"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LanguageChartProps {
  languages: Record<string, number>;
}

export default function LanguageChart({
  languages,
}: LanguageChartProps) {
  const entries = Object.entries(languages);

  const total = entries.reduce((sum, [, count]) => sum + count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Languages</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No language information available.
          </p>
        ) : (
          entries.map(([language, count]) => {
            const percentage = (count / total) * 100;

            return (
              <div key={language}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{language}</span>
                  <span>{count}</span>
                </div>

                <Progress value={percentage} />
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}