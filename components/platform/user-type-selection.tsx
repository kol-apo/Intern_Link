"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Building, Check } from "lucide-react"
import type { UserType } from "@/app/platform/page"

interface UserTypeSelectionProps {
  onUserTypeSelect: (type: UserType) => void
}

export function UserTypeSelection({ onUserTypeSelect }: UserTypeSelectionProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How would you like to use InternLink?</h2>
        <p className="text-lg text-muted-foreground">Choose your role to get started with the right experience</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <Card className="relative overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">I'm an Intern</h3>
            <p className="text-muted-foreground mb-6">
              Looking for internship opportunities to gain experience and build my career
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6 text-left">
              <li className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Submit your CV and skills
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Get matched with opportunities
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Connect with organizations
              </li>
            </ul>
            <Button className="w-full" onClick={() => onUserTypeSelect("intern")}>
              Continue as Intern
            </Button>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">I'm an Organization</h3>
            <p className="text-muted-foreground mb-6">
              Looking to hire talented interns and build our team with fresh talent
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6 text-left">
              <li className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Post internship roles
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Find qualified candidates
              </li>
              <li className="flex items-center">
                <Check className="w-4 h-4 text-green-500 mr-2" />
                Smart matching system
              </li>
            </ul>
            <Button className="w-full" onClick={() => onUserTypeSelect("organization")}>
              Continue as Organization
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
