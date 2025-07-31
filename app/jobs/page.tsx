"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, MapPin, Clock, Building, Users, Eye } from "lucide-react"
import { JobBoardHeader } from "@/components/jobs/job-board-header"
import { useToast } from "@/hooks/use-toast"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/platform/toast-provider"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "paid" | "unpaid" | "both"
  description: string
  fullDescription: string
  skills: string[]
  postedDate: string
  duration: string
  applicants: number
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Development Intern",
    company: "TechStart Ghana",
    location: "Accra, Ghana",
    type: "paid",
    description:
      "Join our dynamic team to build modern web applications using React and TypeScript. Perfect for students looking to gain hands-on experience in frontend development.",
    fullDescription:
      "We are looking for a passionate Frontend Development Intern to join our growing team. You will work alongside experienced developers to create user-friendly web applications that serve thousands of users across Africa. This role offers excellent learning opportunities in modern web technologies including React, TypeScript, and modern CSS frameworks. You'll participate in code reviews, contribute to our design system, and help build features that directly impact our users. We provide mentorship, flexible working hours, and the opportunity to work on real-world projects that matter.",
    skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML"],
    postedDate: "2024-01-15",
    duration: "3-6 months",
    applicants: 24,
  },
  {
    id: "2",
    title: "Digital Marketing Intern",
    company: "AfriMarket Solutions",
    location: "Lagos, Nigeria",
    type: "unpaid",
    description:
      "Learn digital marketing strategies while helping us grow our brand across African markets. Gain experience in social media, content creation, and analytics.",
    fullDescription:
      "Join our marketing team as a Digital Marketing Intern and learn the ins and outs of digital marketing in the African context. You'll work on social media campaigns, create engaging content, analyze marketing metrics, and help develop strategies to reach new audiences. This role is perfect for students interested in marketing, communications, or business. You'll gain hands-on experience with tools like Google Analytics, Facebook Ads Manager, and various content creation platforms. We offer flexible schedules, mentorship from experienced marketers, and the opportunity to see your work impact real business results.",
    skills: ["Social Media", "Content Creation", "Analytics", "SEO", "Canva"],
    postedDate: "2024-01-12",
    duration: "4 months",
    applicants: 18,
  },
  {
    id: "3",
    title: "Data Science Intern",
    company: "DataFlow Africa",
    location: "Cape Town, South Africa",
    type: "paid",
    description:
      "Work with real datasets to extract insights and build predictive models. Perfect opportunity to apply your data science skills in a professional environment.",
    fullDescription:
      "We're seeking a Data Science Intern to join our analytics team and work on exciting projects that help businesses make data-driven decisions. You'll work with large datasets, build machine learning models, create visualizations, and present findings to stakeholders. This role offers exposure to the full data science pipeline from data collection to model deployment. You'll use tools like Python, R, SQL, and various ML libraries. We provide comprehensive mentorship, access to cutting-edge tools, and the opportunity to work on projects that have real business impact across various industries in Africa.",
    skills: ["Python", "R", "SQL", "Machine Learning", "Data Visualization"],
    postedDate: "2024-01-10",
    duration: "6 months",
    applicants: 31,
  },
  {
    id: "4",
    title: "UX/UI Design Intern",
    company: "DesignHub Kenya",
    location: "Nairobi, Kenya",
    type: "both",
    description:
      "Create beautiful and functional user interfaces while learning from experienced designers. Work on mobile and web applications used by thousands.",
    fullDescription:
      "Join our design team as a UX/UI Design Intern and help create intuitive, beautiful user experiences for our clients across Africa. You'll work on both mobile and web applications, conduct user research, create wireframes and prototypes, and collaborate closely with developers to bring designs to life. This role offers hands-on experience with design tools like Figma, Adobe Creative Suite, and prototyping tools. You'll participate in design critiques, user testing sessions, and learn about design systems. We offer mentorship from senior designers, flexible working arrangements, and the opportunity to build a strong portfolio with real-world projects.",
    skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research", "Wireframing"],
    postedDate: "2024-01-08",
    duration: "3-4 months",
    applicants: 27,
  },
  {
    id: "5",
    title: "Backend Development Intern",
    company: "CloudTech Solutions",
    location: "Kigali, Rwanda",
    type: "paid",
    description:
      "Build scalable server-side applications and APIs. Learn about cloud technologies, databases, and modern backend development practices.",
    fullDescription:
      "We're looking for a Backend Development Intern to join our engineering team and help build robust, scalable server-side applications. You'll work with technologies like Node.js, Python, or Java, design and implement APIs, work with databases, and learn about cloud deployment. This role offers excellent exposure to modern backend development practices including microservices, containerization, and CI/CD pipelines. You'll collaborate with frontend developers, participate in architecture discussions, and contribute to code that serves millions of requests. We provide mentorship from senior engineers, access to cloud platforms, and the opportunity to work on high-impact projects.",
    skills: ["Node.js", "Python", "Java", "MongoDB", "AWS", "Docker"],
    postedDate: "2024-01-05",
    duration: "4-6 months",
    applicants: 19,
  },
  {
    id: "6",
    title: "Content Writing Intern",
    company: "MediaWave Africa",
    location: "Johannesburg, South Africa",
    type: "unpaid",
    description:
      "Create engaging content for various digital platforms. Perfect for journalism, communications, or English students looking to build their portfolio.",
    fullDescription:
      "Join our content team as a Content Writing Intern and help create compelling content that engages audiences across Africa. You'll write blog posts, social media content, newsletters, and marketing copy for various clients. This role offers excellent experience in content strategy, SEO writing, and digital storytelling. You'll work with our editorial team to develop content calendars, conduct research, and learn about content optimization. We provide training in content management systems, SEO tools, and writing best practices. This is a great opportunity to build a strong writing portfolio while learning about content marketing in the digital age.",
    skills: ["Content Writing", "SEO", "WordPress", "Research", "Social Media"],
    postedDate: "2024-01-03",
    duration: "3 months",
    applicants: 15,
  },
  {
    id: "7",
    title: "Mobile App Development Intern",
    company: "MobileFirst Uganda",
    location: "Kampala, Uganda",
    type: "paid",
    description:
      "Develop mobile applications for Android and iOS platforms. Learn React Native or Flutter while building apps that solve real problems.",
    fullDescription:
      "We're seeking a Mobile App Development Intern to join our mobile team and help build innovative applications for the African market. You'll work with React Native or Flutter to create cross-platform mobile applications, integrate with APIs, and implement user-friendly interfaces. This role offers hands-on experience with mobile development lifecycle, app store deployment, and mobile-specific design patterns. You'll collaborate with designers and backend developers, participate in user testing, and learn about mobile app optimization. We provide mentorship from experienced mobile developers, access to testing devices, and the opportunity to see your apps used by real users.",
    skills: ["React Native", "Flutter", "JavaScript", "Mobile UI", "API Integration"],
    postedDate: "2024-01-01",
    duration: "5 months",
    applicants: 22,
  },
  {
    id: "8",
    title: "Business Analysis Intern",
    company: "ConsultPro Tanzania",
    location: "Dar es Salaam, Tanzania",
    type: "both",
    description:
      "Analyze business processes and help improve operational efficiency. Great opportunity for business, economics, or management students.",
    fullDescription:
      "Join our consulting team as a Business Analysis Intern and help clients optimize their business processes and operations. You'll conduct market research, analyze business data, create process maps, and develop recommendations for improvement. This role offers excellent exposure to various industries and business challenges across East Africa. You'll work with senior consultants, participate in client meetings, and learn about project management methodologies. We provide training in business analysis tools, data analysis software, and presentation skills. This is an excellent opportunity to develop consulting skills while making a real impact on business operations.",
    skills: ["Business Analysis", "Excel", "Process Mapping", "Research", "Presentation"],
    postedDate: "2023-12-28",
    duration: "4 months",
    applicants: 13,
  },
]

export default function JobBoardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  // Mock user data - in real app this would come from auth context
  const currentUser = {
    name: "John Doe",
    email: "john@example.com",
  }

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const matchesSearch =
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesType = typeFilter === "all" || job.type === typeFilter

      return matchesSearch && matchesType
    })
  }, [searchTerm, typeFilter])

  const handleApply = (jobId: string) => {
    toast({
      title: "Application Submitted!",
      description: "Thank you for applying. The organization will review your application and get back to you soon.",
    })
    setIsDialogOpen(false)
  }

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job)
    setIsDialogOpen(true)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "unpaid":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "both":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "paid":
        return "Paid"
      case "unpaid":
        return "Unpaid"
      case "both":
        return "Paid/Unpaid"
      default:
        return type
    }
  }

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-background">
          <JobBoardHeader user={currentUser} />

          <main className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Available Internship Opportunities</h1>
                <Badge variant="secondary" className="text-sm">
                  {filteredJobs.length} {filteredJobs.length === 1 ? "opportunity" : "opportunities"}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Discover internship opportunities that match your skills and career goals
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by role, company, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="paid">Paid Only</SelectItem>
                  <SelectItem value="unpaid">Unpaid Only</SelectItem>
                  <SelectItem value="both">Paid/Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Listings */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">{job.title}</CardTitle>
                      <Badge className={getTypeColor(job.type)}>{getTypeLabel(job.type)}</Badge>
                    </div>
                    <CardDescription className="flex items-center text-sm">
                      <Building className="w-4 h-4 mr-1" />
                      {job.company}
                    </CardDescription>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{job.description}</p>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {job.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {job.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {job.applicants} applicants
                      </div>
                    </div>

                    <Button className="w-full bg-transparent" variant="outline" onClick={() => handleViewDetails(job)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No opportunities found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find more opportunities.
                </p>
              </div>
            )}
          </main>

          {/* Job Details Modal */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              {selectedJob && (
                <>
                  <DialogHeader>
                    <div className="flex items-start justify-between mb-2">
                      <DialogTitle className="text-xl">{selectedJob.title}</DialogTitle>
                      <Badge className={getTypeColor(selectedJob.type)}>{getTypeLabel(selectedJob.type)}</Badge>
                    </div>
                    <DialogDescription className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Building className="w-4 h-4 mr-2" />
                        {selectedJob.company}
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        {selectedJob.location}
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        Duration: {selectedJob.duration}
                      </div>
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Job Description</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedJob.fullDescription}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-1" />
                        {selectedJob.applicants} people have applied
                      </div>
                      <Button onClick={() => handleApply(selectedJob.id)}>Apply Now</Button>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </ToastProvider>
    </ThemeProvider>
  )
}
