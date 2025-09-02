import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";
import Link from "next/link";
import { Button } from "./button";

export function RequireLoginCard({ message = "You need to be logged in to access this page." }) {
  return (
    <div className="container py-12 text-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Please Log In</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/login">
            <Button>Go to Login</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
