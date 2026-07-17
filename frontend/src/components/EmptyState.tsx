"use client";

import { Search } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <Search className="mb-4 h-14 w-14 text-muted-foreground" />

      <h2 className="text-2xl font-semibold">
        Search for a GitHub Developer
      </h2>

      <p className="mt-2 text-muted-foreground">
        Enter a GitHub username to view their profile,
        repositories, languages and activity.
      </p>
    </div>
  );
}