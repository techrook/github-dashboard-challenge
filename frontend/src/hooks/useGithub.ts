"use client";

import { useQueries } from "@tanstack/react-query";
import { githubApi } from "@/services/github";

export function useGithub(username: string) {
  const enabled = username.trim().length > 0;

  const [dashboard] = useQueries({
    queries: [
      {
        queryKey: ["dashboard", username],
        queryFn: async () => {
          const response = await githubApi.getDashboard(username);
          return response.data.data;
        },
        enabled,
        retry: 1,
      },
    ],
  });

  return {
    dashboard,
    isLoading: dashboard.isLoading,
    isError: dashboard.isError,
    error: dashboard.error,
  };
}