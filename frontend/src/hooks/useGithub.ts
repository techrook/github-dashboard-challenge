"use client";

import { useQueries } from "@tanstack/react-query";
import { githubApi } from "@/services/github";

export function useGithub(username: string) {
  const enabled = username.trim().length > 0;

  const [
    dashboard
  ] = useQueries({
    queries: [
      {
        queryKey:["dashboard", username],
        queryFn: async () =>
          (await githubApi.getDashboard(username)).data.data,
        enabled,
      }
    ],
  });

  return {

    dashboard,

    isLoading:
      dashboard.isLoading,

    isError:
      dashboard.isError,
  };
}