import SessionInfo from "./SessionInfo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* This is a test comment for deployment verification. */}
      <h1>Welcome to SpectrumAI</h1>
      <SessionInfo />
    </main>
  );
}
