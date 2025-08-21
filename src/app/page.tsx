"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-muted relative">
      <div className="absolute top-6 right-6">
        {status === "authenticated" && session?.user?.name ? (
          <span className="font-medium text-lg">👤 {session.user.name}</span>
        ) : (
          <Button variant="outline" onClick={() => router.push("/login")}>
            Login
          </Button>
        )}
      </div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="flex gap-4">
        <Button onClick={() => router.push("/chat")}>Go to Chat</Button>
      </div>
    </div>
  );
}
