"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Loader2 } from "lucide-react"
import { SkillsInput } from "./skills-input"
import type { User, OrganizationData } from "@/app/platform/page"

interface OrganizationFormProps {
  currentUser: User | null
  onSubmit: (data: OrganizationData) => void
  onBack: () => void
}

export function OrganizationForm({ currentUser, onSubmit, onBack }: OrganizationFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [requiredSkills, setRequiredSkills] = useState<string[]>([])
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    const data: OrganizationData = {
      orgName: formData.get("orgName") as string,
      orgEmail: formData.get("orgEmail") as string,
      roleTitle: formData.get("roleTitle") as string,
      jobDescription: formData.get("jobDescription") as string,
      requiredSkills,
      internshipType: formData.get("internshipType") as string,
    }

    // Validation
    if (requiredSkills.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one required skill.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    onSubmit(data)
    setIsLoading(false)
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <Card>
        <CardHeader>
          <Button variant="ghost" size="sm" onClick={onBack} className="w-fit mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <CardTitle className="text-2xl">Post an Internship Role</CardTitle>
          <p className="text-muted-foreground">Find the perfect intern for your organization</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name *</Label>
                <Input id="orgName" name="orgName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgEmail">HR Email Address *</Label>
                <Input id="orgEmail" name="orgEmail" type="email" defaultValue={currentUser?.email || ""} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="roleTitle">Role Title *</Label>
              <Input id="roleTitle" name="roleTitle" placeholder="e.g., Software Development Intern" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description *</Label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                rows={6}
                placeholder="Describe the role, responsibilities, and what the intern will learn..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Required Skills *</Label>
              <SkillsInput skills={requiredSkills} onSkillsChange={setRequiredSkills} />
              <p className="text-sm text-muted-foreground">
                Add required skills one by one. Press Enter after each skill.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="internshipType">Internship Type *</Label>
              <Select name="internshipType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select internship type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Post Role
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
