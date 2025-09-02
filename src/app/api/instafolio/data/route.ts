// filepath: src/app/api/instafolio/data/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Mock CV data for demonstration
  return NextResponse.json({
    fullName: "Jane Doe",
    email: "jane.doe@email.com",
    phone: "+1-555-1234",
    linkedin: "linkedin.com/in/janedoe",
    educations: [
      {
        year: "2020",
        degree: "B.Sc. Computer Science",
        institution: "Tech University",
        location: "New York, NY",
        skills: ["Python", "Algorithms", "Data Structures"],
      },
      {
        year: "2023",
        degree: "M.Sc. AI",
        institution: "AI Institute",
        location: "San Francisco, CA",
        skills: ["Machine Learning", "Deep Learning"],
      },
    ],
    experiences: [
      {
        dateRange: "2023-2025",
        title: "AI Engineer",
        company: "Innovatech",
        achievements: [
          "Developed NLP models",
          "Optimized data pipelines",
        ],
      },
      {
        dateRange: "2021-2023",
        title: "Software Developer",
        company: "Webify",
        achievements: [
          "Built scalable web apps",
          "Led frontend team",
        ],
      },
    ],
    projects: [
      {
        year: "2025",
        title: "Smart Resume Parser",
        description: "Automated CV extraction using AI.",
        tags: ["AI", "NLP", "Resume"],
      },
      {
        year: "2024",
        title: "Job Matcher",
        description: "Matched candidates to jobs using ML.",
        tags: ["ML", "Recruitment"],
      },
    ],
  });
}
