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
  const [searchedUsername, setSearchedUsername] = useState("");

  const {
    dashboard,
    isLoading,
    isError,
  } = useGithub(searchedUsername);

  const handleSearch = (username: string) => {
    const value = username.trim();

    if (!value) return;

    setSearchedUsername(value);
  };

  console.log(dashboard.data)

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-8">
      <SearchBar
        loading={isLoading}
        onSearch={handleSearch}
      />

      {!searchedUsername && <EmptyState />}

      {searchedUsername && isLoading && (
        <LoadingSkeleton />
      )}

      {searchedUsername && isError && (
        <ErrorState
          message="Unable to fetch GitHub data."

        />
      )}

      {searchedUsername &&
        !isLoading &&
        !isError &&
        dashboard.data && (
          <>
            <ProfileCard
              profile={dashboard.data.profile}
            />

            <StatsCards
              stats={dashboard.data.stats}
            />

            <LanguageChart
              languages={dashboard.data.languages}
            />

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">
                Repositories
              </h2>

              {dashboard.data.repositories.length === 0 ? (
                <p className="text-muted-foreground">
                  No public repositories found.
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {dashboard.data.repositories.map((repo: any) => (
                    <RepositoryCard
                      key={repo.id}
                      repo={repo}
                    />
                  ))}
                </div>
              )}
            </section>

            <ActivityTimeline
              activities={dashboard.data.activity}
            />
          </>
        )}
    </main>
  );
}