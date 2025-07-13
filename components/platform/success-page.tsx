"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, DollarSign } from "lucide-react"
import Link from "next/link"
import type { UserType, InternData, OrganizationData } from "@/app/platform/page"

interface SuccessPageProps {
  userType: UserType
  submittedData: InternData | OrganizationData | null
  onSubmitAnother: () => void
}

// Mock intern data for matching
const mockInterns = [
  {
    name: "Amara Okafor",
    education: "Undergraduate",
    skills: ["JavaScript", "React", "Node.js"],
    desiredRole: "Software Development",
    openTo: "Both",
  },
  {
    name: "Kwame Asante",
    education: "Graduate",
    skills: ["Python", "Django", "Machine Learning"],
    desiredRole: "Data Science",
    openTo: "Paid",
  },
  {
    name: "Fatima Kone",
    education: "Undergraduate",
    skills: ["Digital Marketing", "SEO", "Social Media"],
    desiredRole: "Marketing",
    openTo: "Both",
  },
  {
    name: "David Mensah",
    education: "Graduate",
    skills: ["Java", "Spring Boot", "MySQL"],
    desiredRole: "Backend Development",
    openTo: "Paid",
  },
  {
    name: "Aisha Mwangi",
    education: "Undergraduate",
    skills: ["UI/UX Design", "Figma", "Adobe Creative Suite"],
    desiredRole: "Product Design",
    openTo: "Both",
  },
  {
    name: "Emmanuel Osei",
    education: "Graduate",
    skills: ["React Native", "Flutter", "Mobile Development"],
    desiredRole: "Mobile Development",
    openTo: "Paid",
  },
]

export function SuccessPage({ userType, submittedData, onSubmitAnother }: SuccessPageProps) {
  const getMatchedInterns = (requiredSkills: string[]) => {
    return mockInterns
      .filter((intern) =>
        intern.skills.some((skill) =>
          requiredSkills.some(
            (reqSkill) =>
              skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
              reqSkill.toLowerCase().includes(skill.toLowerCase()),
          ),
        ),
      )
      .slice(0, 6)
  }

  const matchedInterns =
    userType === "organization" && submittedData
      ? getMatchedInterns((submittedData as OrganizationData).requiredSkills)
      : []

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
          {userType === "organization" && matchedInterns.length > 0 && (
            <div className="mb-8 text-left">
              <h3 className="text-xl font-semibold mb-2">Matched Interns</h3>
              <p className="text-muted-foreground mb-6">
                Based on your required skills, here are some potential candidates:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedInterns.map((intern, index) => (
                  <Card key={index} className="border-2 hover:border-primary transition-colors">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-1">{intern.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{intern.education}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {intern.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">Interested in: {intern.desiredRole}</p>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {intern.openTo}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
  )
}
