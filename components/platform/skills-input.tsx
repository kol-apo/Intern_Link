"use client"

import { useState, type KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface SkillsInputProps {
  skills: string[]
  onSkillsChange: (skills: string[]) => void
  placeholder?: string
}

export function SkillsInput({
  skills,
  onSkillsChange,
  placeholder = "Type a skill and press Enter",
}: SkillsInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const skill = inputValue.trim()
      if (skill && !skills.includes(skill)) {
        onSkillsChange([...skills, skill])
        setInputValue("")
      }
    }
  }

  const removeSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter((skill) => skill !== skillToRemove))
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="default" className="flex items-center gap-1">
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  )
}
