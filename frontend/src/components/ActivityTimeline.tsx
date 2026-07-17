"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Activity {
  id: string;
  type: string;
  repo:   string | { id: number; name: string; url: string };
  createdAt: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
}



export default function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>

      <CardContent>
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recent public activity.
          </p>
        ) : (
          <div className="space-y-6">
            {activities.map((activity) => {
              const repoName = typeof activity.repo === 'string' 
                ? activity.repo 
                : activity.repo?.name || 'Unknown repo';

              return (
                <div key={activity.id} className="border-l-2 pl-4">
                  <h4 className="font-medium">{activity.type}</h4>
                  <p className="text-sm text-muted-foreground">{repoName}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(activity.createdAt).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}