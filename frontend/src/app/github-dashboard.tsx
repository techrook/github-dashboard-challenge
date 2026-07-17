"use client";

import SearchBar from "@/components/SearchBar";

export default function GithubDashboard() {
  const handleSearch = (username: string) => {
    console.log(username);
  };

  return (
    <SearchBar
      onSearch={handleSearch}
    />
  );
}