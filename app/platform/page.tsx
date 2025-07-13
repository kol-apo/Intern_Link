"use client"

import { useState } from "react"
import { AuthSection } from "@/components/platform/auth-section"
import { UserTypeSelection } from "@/components/platform/user-type-selection"
import { InternForm } from "@/components/platform/intern-form"
import { OrganizationForm } from "@/components/platform/organization-form"
import { SuccessPage } from "@/components/platform/success-page"
import { PlatformHeader } from "@/components/platform/platform-header"
import { ToastProvider } from "@/components/platform/toast-provider"
import { ThemeProvider } from "@/components/theme-provider"

export type UserType = "intern" | "organization" | null
export type Section = "auth" | "userType" | "internForm" | "organizationForm" | "success"

export interface User {
  email: string
  name: string
}

export interface InternData {
  name: string
  email: string
  education: string
  skills: string[]
  cv: File | null
  desiredRole: string
  openTo: string
}

export interface OrganizationData {
  orgName: string
  orgEmail: string
  roleTitle: string
  jobDescription: string
  requiredSkills: string[]
  internshipType: string
}

export default function PlatformPage() {
  const [currentSection, setCurrentSection] = useState<Section>("auth")
  const [userType, setUserType] = useState<UserType>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [submittedData, setSubmittedData] = useState<InternData | OrganizationData | null>(null)

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user)
    setCurrentSection("userType")
  }

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type)
    setCurrentSection(type === "intern" ? "internForm" : "organizationForm")
  }

  const handleFormSubmit = (data: InternData | OrganizationData) => {
    setSubmittedData(data)
    setCurrentSection("success")
  }

  const handleBackToUserType = () => {
    setUserType(null)
    setCurrentSection("userType")
  }

  const handleSubmitAnother = () => {
    setSubmittedData(null)
    setUserType(null)
    setCurrentSection("userType")
  }

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "auth":
        return <AuthSection onAuthSuccess={handleAuthSuccess} />
      case "userType":
        return <UserTypeSelection onUserTypeSelect={handleUserTypeSelect} />
      case "internForm":
        return <InternForm currentUser={currentUser} onSubmit={handleFormSubmit} onBack={handleBackToUserType} />
      case "organizationForm":
        return <OrganizationForm currentUser={currentUser} onSubmit={handleFormSubmit} onBack={handleBackToUserType} />
      case "success":
        return <SuccessPage userType={userType} submittedData={submittedData} onSubmitAnother={handleSubmitAnother} />
      default:
        return <AuthSection onAuthSuccess={handleAuthSuccess} />
    }
  }

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-background">
          <PlatformHeader />
          <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
            {renderCurrentSection()}
          </main>
        </div>
      </ToastProvider>
    </ThemeProvider>
  )
}
