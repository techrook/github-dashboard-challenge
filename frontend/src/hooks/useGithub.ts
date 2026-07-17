"use client";

import { useQueries } from "@tanstack/react-query";
import { githubApi } from "@/services/github";

export function useGithub(username: string) {
  const enabled = username.trim().length > 0;

  const [
    profile,
    repositories,
    languages,
    stats,
    activity,
  ] = useQueries({
    queries: [
      {
        queryKey: ["profile", username],
        queryFn: async () =>
          (await githubApi.getProfile(username)).data.data,
        enabled,
      },
      {
        queryKey: ["repos", username],
        queryFn: async () =>
          (await githubApi.getRepositories(username)).data.data,
        enabled,
      },
      {
        queryKey: ["languages", username],
        queryFn: async () =>
          (await githubApi.getLanguages(username)).data.data,
        enabled,
      },
      {
        queryKey: ["stats", username],
        queryFn: async () =>
          (await githubApi.getStats(username)).data.data,
        enabled,
      },
      {
        queryKey: ["activity", username],
        queryFn: async () =>
          (await githubApi.getActivity(username)).data.data,
        enabled,
      },
    ],
  });

  return {
    profile,
    repositories,
    languages,
    stats,
    activity,

    isLoading:
      profile.isLoading ||
      repositories.isLoading ||
      languages.isLoading ||
      stats.isLoading ||
      activity.isLoading,

    isError:
      profile.isError ||
      repositories.isError ||
      languages.isError ||
      stats.isError ||
      activity.isError,
  };
}