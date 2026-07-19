"use client";

import { useState } from "react";
import axios from "axios";

import SearchBar from "@/components/SearchBar";
import Hero from "@/components/Hero";
import EmptyState from "@/components/EmptyState";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorState from "@/components/ErrorState";
import ProfileCard from "@/components/ProfileCard";
import StatsCards from "@/components/StatsCards";
import RepositoryCard from "@/components/RepositoryCard";
import LanguageChart from "@/components/LanguageChart";
import ActivityTimeline from "@/components/ActivityTimeline";

import { useGithub } from "@/hooks/useGithub";

export default function GithubDashboard() {
  const [searchedUsername, setSearchedUsername] = useState("");

  const {
    dashboard,
    isLoading,
    isError,
    error,
  } = useGithub(searchedUsername);

  const handleSearch = (username: string) => {
    const value = username.trim();

    if (!value) return;

    setSearchedUsername(value);
  };

  let errorTitle = "Something went wrong";
  let errorMessage =
    "We couldn't retrieve GitHub data. Please try again.";

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    switch (status) {
      case 404:
        errorTitle = "User not found";
        errorMessage =
          "We couldn't find a GitHub account with that username.";
        break;

      case 429:
        errorTitle = "Too many requests";
        errorMessage =
          "GitHub rate limit exceeded. Please wait a few minutes and try again.";
        break;

      case 500:
        errorTitle = "Server error";
        errorMessage =
          "Our server encountered an unexpected error. Please try again shortly.";
        break;

      default:
        errorTitle = "Request failed";
        errorMessage =
          error.response?.data?.message ??
          "Unable to fetch GitHub data.";
    }
  } else if (error) {
    errorTitle = "Connection failed";
    errorMessage =
      "Unable to connect to the server. Please check your internet connection.";
  }

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-8">
      <Hero />

      <div className="-mt-20 relative z-20 flex justify-center">
        <SearchBar
          loading={isLoading}
          onSearch={handleSearch}
        />
      </div>

      {!searchedUsername && <EmptyState />}

      {searchedUsername && isLoading && <LoadingSkeleton />}

      {searchedUsername && isError && (
        <ErrorState
          title={errorTitle}
          message={errorMessage}
          onRetry={() => handleSearch(searchedUsername)}
        />
      )}

      {searchedUsername &&
        !isLoading &&
        !isError &&
        dashboard.data && (
          <>
            <ProfileCard profile={dashboard.data.profile} />

            <StatsCards stats={dashboard.data.stats} />

            <LanguageChart
              languages={dashboard.data.languages}
            />

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">
                    Repositories
                  </h2>

                  <p className="mt-1 text-muted-foreground">
                    Explore public repositories and project
                    activity.
                  </p>
                </div>

                <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  {dashboard.data.repositories.length} Repositories
                </div>
              </div>

              {dashboard.data.repositories.length === 0 ? (
                <p className="text-muted-foreground">
                  No public repositories found.
                </p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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