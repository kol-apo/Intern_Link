"use client";

import React, { useState } from "react";
import { AuthSection } from "@/components/platform/auth-section";
import { UserTypeSelection } from "@/components/platform/user-type-selection";
import { InternForm } from "@/components/platform/intern-form";
import { OrganizationForm } from "@/components/platform/organization-form";
import { SuccessPage } from "@/components/platform/success-page";
import { PlatformHeader } from "@/components/platform/platform-header";
import { ToastProvider } from "@/components/platform/toast-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider, useAuth } from "@/lib/auth-context";

export type UserType = "intern" | "organization" | null;
export type Section =
  | "auth"
  | "userType"
  | "internForm"
  | "organizationForm"
  | "success";

export interface User {
  email: string;
  name: string;
}

export interface InternData {
  name: string;
  email: string;
  education: string;
  skills: string[];
  cv: File | null;
  desiredRole: string;
  openTo: string;
}

export interface OrganizationData {
  orgName: string;
  orgEmail: string;
  roleTitle: string;
  jobDescription: string;
  requiredSkills: string[];
  internshipType: string;
}

function PlatformContent() {
  const [currentSection, setCurrentSection] = useState<Section>("auth");
  const [userType, setUserType] = useState<UserType>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [submittedData, setSubmittedData] = useState<
    InternData | OrganizationData | null
  >(null);
  const { user: authUser, loading } = useAuth();

  // If user is already authenticated, skip auth section
  React.useEffect(() => {
    if (authUser && !loading) {
      setCurrentUser({ email: authUser.email, name: authUser.name });
      setCurrentSection("userType");
    }
  }, [authUser, loading]);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentSection("userType");
  };

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setCurrentSection(type === "intern" ? "internForm" : "organizationForm");
  };

  const handleFormSubmit = (data: InternData | OrganizationData) => {
    if (userType === "intern") {
      // For interns, redirect to job board
      window.location.href = "/jobs";
    } else {
      // For organizations, show success page with matches
      setSubmittedData(data);
      setCurrentSection("success");
    }
  };

  const handleBackToUserType = () => {
    setUserType(null);
    setCurrentSection("userType");
  };

  const handleSubmitAnother = () => {
    setSubmittedData(null);
    setUserType(null);
    setCurrentSection("userType");
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "auth":
        return <AuthSection onAuthSuccess={handleAuthSuccess} />;
      case "userType":
        return <UserTypeSelection onUserTypeSelect={handleUserTypeSelect} />;
      case "internForm":
        return (
          <InternForm
            currentUser={currentUser}
            onSubmit={handleFormSubmit}
            onBack={handleBackToUserType}
          />
        );
      case "organizationForm":
        return (
          <OrganizationForm
            currentUser={currentUser}
            onSubmit={handleFormSubmit}
            onBack={handleBackToUserType}
          />
        );
      case "success":
        return (
          <SuccessPage
            userType={userType}
            submittedData={submittedData}
            onSubmitAnother={handleSubmitAnother}
          />
        );
      default:
        return <AuthSection onAuthSuccess={handleAuthSuccess} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PlatformHeader />
      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
        {renderCurrentSection()}
      </main>
    </div>
  );
}

export default function PlatformPage() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <PlatformContent />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
