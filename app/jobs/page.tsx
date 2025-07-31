"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  MapPin,
  Clock,
  Building,
  Users,
  Eye,
  Loader2,
} from "lucide-react";
import { JobBoardHeader } from "@/components/jobs/job-board-header";
import { useToast } from "@/hooks/use-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/platform/toast-provider";
import { AuthProvider, useAuth } from "@/lib/auth-context";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "paid" | "unpaid" | "both";
  description: string;
  fullDescription: string;
  skills: string[];
  postedDate: string;
  duration: string;
  applicants: number;
}

function JobBoardContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch jobs from API
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/jobs");

      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs);
      } else {
        console.error("Failed to fetch jobs");
        toast({
          title: "Error",
          description: "Failed to load job opportunities",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast({
        title: "Error",
        description: "An error occurred while loading jobs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch =
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesType = typeFilter === "all" || job.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [jobs, searchTerm, typeFilter]);

  const handleApply = (jobId: string) => {
    toast({
      title: "Application Submitted!",
      description:
        "Thank you for applying. The organization will review your application and get back to you soon.",
    });
    setIsDialogOpen(false);
  };

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "unpaid":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "both":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "paid":
        return "Paid";
      case "unpaid":
        return "Unpaid";
      case "both":
        return "Paid/Unpaid";
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <JobBoardHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading opportunities...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <JobBoardHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">
              Available Internship Opportunities
            </h1>
            <Badge variant="secondary" className="text-sm">
              {filteredJobs.length}{" "}
              {filteredJobs.length === 1 ? "opportunity" : "opportunities"}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Discover internship opportunities that match your skills and career
            goals
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by role, company, or skills..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
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
          {filteredJobs.map(job => (
            <Card
              key={job.id}
              className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {job.title}
                  </CardTitle>
                  <Badge className={getTypeColor(job.type)}>
                    {getTypeLabel(job.type)}
                  </Badge>
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
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {job.description}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {job.skills.slice(0, 3).map(skill => (
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

                <Button
                  className="w-full bg-transparent"
                  variant="outline"
                  onClick={() => handleViewDetails(job)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No opportunities found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find more
              opportunities.
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
                  <DialogTitle className="text-xl">
                    {selectedJob.title}
                  </DialogTitle>
                  <Badge className={getTypeColor(selectedJob.type)}>
                    {getTypeLabel(selectedJob.type)}
                  </Badge>
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
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedJob.fullDescription}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map(skill => (
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
                  <Button onClick={() => handleApply(selectedJob.id)}>
                    Apply Now
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function JobBoardPage() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <JobBoardContent />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
