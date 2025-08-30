"use client";
import React, { useState, useEffect } from "react";

// Define your expected data structure here
type Education = {
  year: string;
  degree: string;
  institution: string;
  location: string;
  skills: string[];
};

type Experience = {
  dateRange: string;
  title: string;
  company: string;
  achievements: string[];
};

type Project = {
  year: string;
  title: string;
  description: string;
  tags: string[];
};

type CVData = {
  fullName: string;
  email: string;
  phone?: string;
  linkedin?: string;
  educations: Education[];
  experiences: Experience[];
  projects: Project[];
};

export default function InstafolioPage() {
  const [data, setData] = useState<CVData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/instafolio/data");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = (await res.json()) as CVData;
        setData(json);
      } catch {
        setError("Failed to load CV data.");
        setData(null);
      }
    };
    void fetchData();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file, file.name);
    setUploading(true);
    setUploadMsg(null);
    try {
      const res = await fetch("/api/instafolio/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      setUploadMsg("Upload successful!");
    } catch {
      setUploadMsg("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">CV Extractor - InstaFolio</h1>
      <div className="mb-6">
        <div><b>Name:</b> {data.fullName}</div>
        <div><b>Email:</b> {data.email}</div>
        {data.phone && <div><b>Phone:</b> {data.phone}</div>}
        {data.linkedin && <div><b>LinkedIn:</b> {data.linkedin}</div>}
      </div>
      <div className="mb-6">
        <label htmlFor="cv-upload" className="block mb-2 font-semibold">Upload your CV (PDF):</label>
        <input
          id="cv-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={uploading}
          title="Upload your CV as PDF"
        />
        {uploading && <span className="ml-2 text-blue-500">Uploading...</span>}
        {uploadMsg && <div className="mt-2 text-green-600">{uploadMsg}</div>}
      </div>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Education</h2>
      <table className="min-w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Year</th>
            <th className="border px-2 py-1">Degree</th>
            <th className="border px-2 py-1">Institution</th>
            <th className="border px-2 py-1">Location</th>
            <th className="border px-2 py-1">Skills</th>
          </tr>
        </thead>
        <tbody>
          {data.educations.map((edu, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{edu.year}</td>
              <td className="border px-2 py-1">{edu.degree}</td>
              <td className="border px-2 py-1">{edu.institution}</td>
              <td className="border px-2 py-1">{edu.location}</td>
              <td className="border px-2 py-1">{edu.skills.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Experience</h2>
      <table className="min-w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Date Range</th>
            <th className="border px-2 py-1">Title</th>
            <th className="border px-2 py-1">Company</th>
            <th className="border px-2 py-1">Achievements</th>
          </tr>
        </thead>
        <tbody>
          {data.experiences.map((exp, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{exp.dateRange}</td>
              <td className="border px-2 py-1">{exp.title}</td>
              <td className="border px-2 py-1">{exp.company}</td>
              <td className="border px-2 py-1">{exp.achievements.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Projects</h2>
      <table className="min-w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Year</th>
            <th className="border px-2 py-1">Title</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Tags</th>
          </tr>
        </thead>
        <tbody>
          {data.projects.map((proj, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{proj.year}</td>
              <td className="border px-2 py-1">{proj.title}</td>
              <td className="border px-2 py-1">{proj.description}</td>
              <td className="border px-2 py-1">{proj.tags.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
