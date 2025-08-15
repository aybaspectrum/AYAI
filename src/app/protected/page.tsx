"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) router.push("/login"); // Redirect if not authenticated
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null; // Or a loading spinner, etc.
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1>Protected Content</h1>
      <p>Welcome, {session.user?.name}!</p>
    </div>
  );
}
