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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function UploadPage() {
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadFileMutation = api.upload.uploadFile.useMutation();
  const processFileMutation = api.upload.processFile.useMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file ?? null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      toast({ title: "No file selected", description: "Please select a file to upload.", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = async () => {
      const result = reader.result;
      const base64Content = typeof result === 'string' ? result.split(",")[1] : undefined;

      if (!base64Content) {
        toast({ title: "Error reading file", description: "Could not read file content.", variant: "destructive" });
        setIsLoading(false);
        return;
      }

      try {
        const uploadResult = await uploadFileMutation.mutateAsync({
          fileName: selectedFile.name,
          fileContent: base64Content,
          fileType: selectedFile.type,
        });
        toast({ title: "Upload successful!", description: `File uploaded to: ${uploadResult.url}` });

        const processResult = await processFileMutation.mutateAsync({ blobUrl: uploadResult.url });
        toast({ title: "Processing complete!", description: `Imported ${processResult.importedCount} career events.` });
        setSelectedFile(null);
      } catch (error) {
        console.error("Error during file operation:", error);
        toast({ title: "Operation failed", description: "Failed to upload or process file.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = (error) => {
      console.error("FileReader error:", error);
      toast({ title: "File read error", description: "Failed to read the selected file.", variant: "destructive" });
      setIsLoading(false);
    };
  };

  if (!session) {
    return (
      <div className="container py-12 text-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Please Log In</CardTitle>
            <CardDescription>You need to be logged in to upload files.</CardDescription>
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

  return (
    <div className="container flex flex-col items-center justify-center py-12">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Upload Your Data</CardTitle>
          <CardDescription>
            Upload a CSV or document to automatically extract your career events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file">Select File</Label>
              <Input id="file" type="file" accept=".csv,.pdf,.doc,.docx,.txt" onChange={handleFileChange} />
              {selectedFile && <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Uploading & Processing...</>
              ) : (
                <><Upload className="w-4 h-4 mr-2" />Upload & Process File</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
