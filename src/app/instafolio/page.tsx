"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react";

// Define your expected data structure here



export default function InstafolioPage() {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = api.instafolio.list.useQuery();
  // const uploadMutation = api.instafolio.create.useMutation();
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<string | null>(null);

  // Example: handle file upload and parse, then call uploadMutation.mutateAsync with parsed data
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadMsg(null);
    try {
      // TODO: Parse PDF and extract data, then call uploadMutation.mutateAsync(parsedData)
      // For now, just simulate success
      await new Promise((res) => setTimeout(res, 1000));
      setUploadMsg("Upload successful! (Parsing not implemented)");
      await refetch();
    } catch {
      setUploadMsg("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error.message || "Failed to load CV data."}</div>;
  }
  if (!data || data.length === 0) {
    return <div>No CV data found.</div>;
  }
  const cv = data[0];

  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold mb-4">CV Extractor - InstaFolio</h1>
      <div className="mb-6">
        <div><b>Name:</b> {cv?.fullName}</div>
        <div><b>Email:</b> {cv?.email}</div>
        {cv?.phone && <div><b>Phone:</b> {cv.phone}</div>}
        {cv?.linkedin && <div><b>LinkedIn:</b> {cv.linkedin}</div>}
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
          {cv?.educations?.map((edu, i) => (
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
          {cv?.experiences?.map((exp, i) => (
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
          {cv?.projects?.map((proj, i) => (
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
