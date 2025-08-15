"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function SessionInfo() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.name}</p>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <p>Not signed in</p>
      <Link href="/login">Login</Link>
    </div>
  );
}
