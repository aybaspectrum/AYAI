"use client";

import { motion } from "motion/react";
import SignInButton from "./SignInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { SpectrumLogo } from "~/components/ui/spectrum-logo";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <SpectrumLogo className="h-16 w-16" />
            </div>
            <CardTitle className="text-3xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to continue to SpectrumAI</CardDescription>
          </CardHeader>
          <CardContent>
            <SignInButton />
          </CardContent>
          <CardFooter>
            <p className="text-muted-foreground text-center text-sm">
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
