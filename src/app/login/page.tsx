"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Login to Continue</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button variant="outline" onClick={() => signIn("google")}>
            <svg
              className="mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <g>
                <path
                  fill="#4285F4"
                  d="M21.805 10.023h-9.18v3.955h5.627c-.243 1.3-1.47 3.813-5.627 3.813-3.386 0-6.146-2.8-6.146-6.25s2.76-6.25 6.146-6.25c1.93 0 3.23.82 3.97 1.53l2.71-2.63C17.09 2.67 14.98 1.5 12.625 1.5 6.99 1.5 2.5 6.01 2.5 11.5s4.49 10 10.125 10c5.84 0 9.68-4.09 9.68-9.84 0-.66-.07-1.16-.17-1.64z"
                />
              </g>
            </svg>
            Sign in with Google
          </Button>
          <Button variant="outline" onClick={() => signIn("github")}>
            <svg
              className="mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"
              />
            </svg>
            Sign in with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
