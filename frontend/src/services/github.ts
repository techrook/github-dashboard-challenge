import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

export const githubApi = {
    getProfile(username: string) {
      return api.get(`/github/users/${username}`);
    },
  
    getRepositories(username: string) {
      return api.get(`/github/users/${username}/repos`);
    },
  
    getLanguages(username: string) {
      return api.get(`/github/users/${username}/languages`);
    },
  
    getStats(username: string) {
      return api.get(`/github/users/${username}/stats`);
    },
  
    getActivity(username: string) {
      return api.get(`/github/users/${username}/activity`);
    },
  };
