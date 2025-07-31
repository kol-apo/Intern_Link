"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, DollarSign, Loader2, FileText } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import type {
  UserType,
  InternData,
  OrganizationData,
} from "@/app/platform/page";

interface SuccessPageProps {
  userType: UserType;
  submittedData: InternData | OrganizationData | null;
  onSubmitAnother: () => void;
}

interface MatchedIntern {
  id: string;
  name: string;
  email: string;
  education: string;
  skills: string[];
  desiredRole: string;
  openTo: string;
  matchScore: number;
  matchingSkills: string[];
  userId: string;
}

export function SuccessPage({
  userType,
  submittedData,
  onSubmitAnother,
}: SuccessPageProps) {
  const [matchedInterns, setMatchedInterns] = useState<MatchedIntern[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (userType === "organization" && submittedData) {
      fetchMatchedInterns();
    }
  }, [userType, submittedData]);

  const fetchMatchedInterns = async () => {
    if (!submittedData || userType !== "organization") return;

    setLoading(true);
    try {
      const orgData = submittedData as OrganizationData;
      const skillsParam = orgData.requiredSkills.join(",");

      const response = await fetch(
        `/api/matching/interns?skills=${encodeURIComponent(
          skillsParam
        )}&limit=6`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMatchedInterns(data.interns);
      } else {
        console.error("Failed to fetch matched interns");
      }
    } catch (error) {
      console.error("Error fetching matched interns:", error);
      toast({
        title: "Error",
        description: "Failed to load matched interns",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewCV = async (userId: string, internName: string) => {
    try {
      const response = await fetch(`/api/intern/cv/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Get the blob from the response
        const blob = await response.blob();

        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element and trigger download
        const link = document.createElement("a");
        link.href = url;
        link.download = `${internName}_CV.pdf`;
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast({
          title: "CV Downloaded",
          description: `${internName}'s CV has been downloaded successfully.`,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to download CV",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error downloading CV:", error);
      toast({
        title: "Error",
        description: "An error occurred while downloading the CV",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-2xl font-bold mb-4">Success!</h2>
          <p className="text-lg text-muted-foreground mb-8">
            {userType === "intern"
              ? "Thank you! Your profile has been submitted successfully."
              : "Your role has been posted successfully!"}
          </p>

          {/* Matched Interns for Organizations */}
          {userType === "organization" && (
            <div className="mb-8 text-left">
              <h3 className="text-xl font-semibold mb-2">Matched Interns</h3>
              <p className="text-muted-foreground mb-6">
                Based on your required skills, here are some potential
                candidates:
              </p>

              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  <span>Finding matched interns...</span>
                </div>
              ) : matchedInterns.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchedInterns.map(intern => (
                    <Card
                      key={intern.id}
                      className="border-2 hover:border-primary transition-colors"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{intern.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {intern.matchScore}% match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {intern.education}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {intern.skills.slice(0, 3).map(skill => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {intern.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{intern.skills.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-2">
                          Interested in: {intern.desiredRole}
                        </p>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {intern.openTo}
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            handleViewCV(intern.userId, intern.name)
                          }
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          View CV
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No matching interns found at the moment.</p>
                  <p className="text-sm">
                    Check back later or try adjusting your skill requirements.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onSubmitAnother}>Submit Another</Button>
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
