"use client";

import SearchBar from "@/components/SearchBar";

export default function Home() {
  const handleSearch = (username: string) => {
    console.log(username);
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <SearchBar
        loading={false}
        onSearch={handleSearch}
      />
    </main>
  );
}