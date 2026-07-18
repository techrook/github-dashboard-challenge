"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  GitCommit,
  GitPullRequest,
  GitBranch,
  Star,
  Circle,
} from "lucide-react";

interface Activity {
  id: string;
  type: string;
  repo: string | { id: number; name: string; url: string };
}

interface ActivityTimelineProps {
  activities: Activity[];
}

function getEventIcon(type: string) {
  switch (type) {
    case "PushEvent":
      return <GitCommit className="h-4 w-4 text-primary" />;

    case "PullRequestEvent":
      return (
        <GitPullRequest className="h-4 w-4 text-green-500" />
      );

    case "ForkEvent":
      return (
        <GitBranch className="h-4 w-4 text-yellow-400" />
      );

    case "WatchEvent":
      return <Star className="h-4 w-4 text-amber-400" />;

    default:
      return (
        <Circle className="h-3 w-3 fill-primary text-primary" />
      );
  }
}

function getEventLabel(type: string) {
  switch (type) {
    case "PushEvent":
      return "Pushed commits";

    case "PullRequestEvent":
      return "Opened Pull Request";

    case "ForkEvent":
      return "Forked repository";

    case "WatchEvent":
      return "Starred repository";

    case "CreateEvent":
      return "Created repository";

    default:
      return type.replace("Event", "");
  }
}

export default function ActivityTimeline({
  activities,
}: ActivityTimelineProps) {
  return (
    <Card className="rounded-2xl border-white/10">
      <CardHeader>
        <CardTitle className="text-2xl">
          Recent Activity
        </CardTitle>
      </CardHeader>

      <CardContent>
        {activities.length === 0 ? (
          <p className="text-muted-foreground">
            No recent public activity.
          </p>
        ) : (
          <div className="space-y-8">
            {activities.map((activity, index) => {
              const repoName =
                typeof activity.repo === "string"
                  ? activity.repo
                  : activity.repo?.name ?? "Unknown repository";

              return (
                <div
                  key={activity.id}
                  className="relative flex gap-4"
                >
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      {getEventIcon(activity.type)}
                    </div>

                    {index !== activities.length - 1 && (
                      <div className="mt-2 h-full w-px bg-border" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8">
                    <h4 className="font-semibold text-foreground">
                      {getEventLabel(activity.type)}
                    </h4>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {repoName}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}