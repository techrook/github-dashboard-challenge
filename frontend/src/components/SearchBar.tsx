"use client";

import { useState, KeyboardEvent } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (username: string) => void;
  loading?: boolean;
}

export default function SearchBar({
  onSearch,
  loading = false,
}: SearchBarProps) {
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    const value = username.trim();

    if (!value) return;

    onSearch(value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full max-w-2xl gap-3">
      <Input
        placeholder="Search GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        className="h-11"
      />

      <Button
        onClick={handleSearch}
        disabled={loading}
        className="h-11 px-6"
      >
        <Search className="mr-2 h-4 w-4" />
        {loading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
}