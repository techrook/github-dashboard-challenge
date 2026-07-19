"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-card p-10 text-center shadow-lg">
      <div className="mb-4 rounded-full bg-red-500/10 p-4">
        <AlertTriangle className="h-10 w-10 text-red-500" />
      </div>

      <h2 className="text-2xl font-bold text-foreground">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-muted-foreground">
        {message}
      </p>

      {onRetry && (
        <Button
          className="mt-6"
          onClick={onRetry}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}