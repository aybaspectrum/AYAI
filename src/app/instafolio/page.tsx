"use client";
import React, { useState, useEffect } from "react";

// Define your expected data structure here
type DataType = {
  someField?: string;
  // Add other fields as needed
};

export default function InstafolioPage() {
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/instafolio/data");
        if (!res.ok) throw new Error("Failed to fetch");
  const json = (await res.json()) as DataType;
  setData(json);
      } catch {
        // Optionally handle error, e.g. set error state
        setData(null);
      }
    };
    void fetchData();
  }, []);

  return (
    <div>
      {data?.someField ? <span>{data.someField}</span> : <span>No data</span>}
    </div>
  );
}
