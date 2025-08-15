"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "~/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";
import { api } from "~/trpc/react";

export default function UploadPage() {
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadFileMutation = api.upload.uploadFile.useMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file ?? null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = async () => {
      const result = reader.result;
      const base64Content = typeof result === 'string' ? result.split(",")[1] : undefined;

      if (!base64Content) {
        toast({
          title: "Error reading file",
          description: "Could not read file content.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      try {
        const result = await uploadFileMutation.mutateAsync({
          fileName: selectedFile.name,
          fileContent: base64Content,
          fileType: selectedFile.type,
        });

        toast({
          title: "Upload successful!",
          description: `File uploaded to: ${result.url}`,
        });
        setSelectedFile(null);
      } catch (error) {
        console.error("Error uploading file:", error);
        toast({
          title: "Upload failed",
          description: "Failed to upload file. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = (error) => {
      console.error("FileReader error:", error);
      toast({
        title: "File read error",
        description: "Failed to read the selected file.",
        variant: "destructive",
      });
      setIsLoading(false);
    };
  };

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in first</h1>
          <Link href="/login" className="text-blue-600 hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Upload Your Data</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="file">Select File</Label>
            <Input
              id="file"
              type="file"
              accept=".csv,.pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <p className="text-sm text-gray-500">Selected: {selectedFile.name}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
