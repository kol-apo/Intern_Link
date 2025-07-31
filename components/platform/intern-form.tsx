"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Upload, X } from "lucide-react";
import { SkillsInput } from "./skills-input";
import { useAuth } from "@/lib/auth-context";
import type { User, InternData } from "@/app/platform/page";

interface InternFormProps {
  currentUser: User | null;
  onSubmit: (data: InternData) => void;
  onBack: () => void;
}

export function InternForm({ currentUser, onSubmit, onBack }: InternFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const { token } = useAuth();

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
        const base64 = base64String.split(",")[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const data: InternData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      education: formData.get("education") as string,
      skills,
      cv: selectedFile,
      desiredRole: formData.get("desiredRole") as string,
      openTo: formData.get("openTo") as string,
    };

    // Validation
    if (skills.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one skill.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please upload your CV.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Convert file to base64
      const cvBase64 = await convertFileToBase64(selectedFile);

      // Submit to backend API
      const response = await fetch("/api/intern/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          education: data.education,
          skills: data.skills,
          desiredRole: data.desiredRole,
          openTo: data.openTo,
          cvBase64,
          cvFileName: selectedFile.name,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Profile Created!",
          description:
            "Your profile has been created successfully. Explore available opportunities below.",
        });

        // Call the original onSubmit to maintain the flow
        onSubmit(data);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create profile",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Profile creation error:", error);
      toast({
        title: "Error",
        description: "An error occurred while creating your profile",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOC, or DOCX file",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <Card>
        <CardHeader>
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="w-fit mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <CardTitle className="text-2xl">Create Your Intern Profile</CardTitle>
          <p className="text-muted-foreground">
            Tell us about yourself to get matched with the right opportunities
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={currentUser?.name || ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={currentUser?.email || ""}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education Level *</Label>
              <Select name="education" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="graduate">Graduate</SelectItem>
                  <SelectItem value="postgraduate">Postgraduate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Skills *</Label>
              <SkillsInput skills={skills} onSkillsChange={setSkills} />
              <p className="text-sm text-muted-foreground">
                Add your skills one by one. Press Enter after each skill.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cv">CV Upload *</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  id="cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label htmlFor="cv" className="cursor-pointer">
                  {selectedFile ? (
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-primary font-medium">
                        {selectedFile.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={e => {
                          e.preventDefault();
                          setSelectedFile(null);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload your CV (PDF, DOC, DOCX) - Max 5MB
                      </p>
                    </div>
                  )}
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="desiredRole">Desired Role / Field *</Label>
              <Input
                id="desiredRole"
                name="desiredRole"
                placeholder="e.g., Software Development, Marketing, Design"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="openTo">Open To *</Label>
              <Select name="openTo" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid Internships Only</SelectItem>
                  <SelectItem value="unpaid">
                    Unpaid Internships Only
                  </SelectItem>
                  <SelectItem value="both">Both Paid and Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
