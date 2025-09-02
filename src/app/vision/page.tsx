import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Link from "next/link";

const VisionPage = () => {
  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Our Vision</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-lg">
            To empower individuals to achieve their full career potential by
            providing personalized, AI-driven guidance and support.
          </p>
          <h2 className="mt-8 text-2xl font-bold">Mission</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Our mission is to create a comprehensive career development platform
            that leverages cutting-edge technology to provide users with
            actionable insights, personalized recommendations, and a clear
            roadmap for their professional journey. We aim to be a trusted
            partner for individuals at every stage of their career, from
            students exploring their options to seasoned professionals looking
            to make a change.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Features</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Personalized Roadmap</h3>
            <p className="text-muted-foreground">
              Get a customized career roadmap based on your skills, interests,
              and goals. Our AI-powered platform will help you identify the
              right career path and provide you with the steps to get there.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
            <p className="text-muted-foreground">
              Leverage the power of AI to gain insights into your career. Our
              platform will analyze your resume, skills, and experience to
              provide you with personalized recommendations and feedback.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Career Events</h3>
            <p className="text-muted-foreground">
              Discover and attend career events, workshops, and networking
              opportunities. Our platform will help you connect with industry
              professionals and stay up-to-date with the latest trends.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Timeline View</h3>
            <p className="text-muted-foreground">
              Visualize your career journey with our interactive timeline view.
              Track your progress, set goals, and stay motivated as you work
              towards your career aspirations.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Ready to Start Your Journey?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-lg">
            Sign up today and take the first step towards a more fulfilling
            career.
          </p>
          <div className="mt-6">
            <Link href="/login">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisionPage;
