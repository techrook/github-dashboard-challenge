"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProfileCardProps {
  profile: {
    login: string;
    name: string;
    avatar_url: string;
    bio: string | null;
    followers: number;
    following: number;
    public_repos: number;
    location?: string | null;
    company?: string | null;
  };
}

export default function ProfileCard({
  profile,
}: ProfileCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-6 p-6 md:flex-row">
        <Avatar className="h-28 w-28">
          <AvatarImage src={profile.avatar_url} />
          <AvatarFallback>
            {profile.login.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-muted-foreground">@{profile.login}</p>
          </div>

          <p>{profile.bio || "No bio available."}</p>

          <div className="flex flex-wrap gap-2">
            {profile.location && (
              <Badge variant="secondary">
                📍 {profile.location}
              </Badge>
            )}

            {profile.company && (
              <Badge variant="secondary">
                🏢 {profile.company}
              </Badge>
            )}
          </div>

          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-2xl font-bold">
                {profile.followers}
              </p>
              <p className="text-sm text-muted-foreground">
                Followers
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold">
                {profile.following}
              </p>
              <p className="text-sm text-muted-foreground">
                Following
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold">
                {profile.public_repos}
              </p>
              <p className="text-sm text-muted-foreground">
                Repositories
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}