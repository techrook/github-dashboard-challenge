"use client";

import { useState } from "react";

import SearchBar from "@/components/SearchBar";
import ProfileCard from "@/components/ProfileCard";
import StatsCards from "@/components/StatsCards";
import RepositoryCard from "@/components/RepositoryCard";
import LanguageChart from "@/components/LanguageChart";
import ActivityTimeline from "@/components/ActivityTimeline";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";

import { useGithub } from "@/hooks/useGithub";

export default function GithubDashboard() {
  const [username, setUsername] = useState("");

  const {
    profile,
    repositories,
    languages,
    stats,
    activity,
    isLoading,
    isError,
  } = useGithub(username);

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-8">
      <SearchBar loading={isLoading} onSearch={setUsername} />

      {!username && <EmptyState />}

      {username && isLoading && <LoadingSkeleton />}

      {username && isError && (
        <ErrorState
          message="Unable to fetch GitHub data."
          onRetry={() => setUsername(username)}
        />
      )}

      {username && !isLoading && !isError && profile.data && (
        <>
          <ProfileCard profile={profile.data} />

          <StatsCards stats={stats.data} />

          <LanguageChart languages={languages.data} />

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Repositories</h2>

            {repositories.data.length === 0 ? (
              <p className="text-muted-foreground">
                No public repositories found.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {repositories.data.map((repo: any) => (
                  <RepositoryCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}
          </section>

          <ActivityTimeline activities={activity.data} />
        </>
      )}
    </main>
  );
}
