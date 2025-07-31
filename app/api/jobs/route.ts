import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import OrganizationRole from "@/models/OrganizationRole";

// Dummy jobs data for demonstration
const dummyJobs = [
  {
    id: "1",
    title: "Software Development Intern",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "paid",
    description:
      "Join our dynamic team and work on cutting-edge web applications using React, Node.js, and MongoDB. Gain hands-on experience with modern development practices.",
    fullDescription:
      "We're looking for a passionate software development intern to join our engineering team. You'll work alongside senior developers on real projects, learning modern web development technologies including React, Node.js, MongoDB, and AWS. This is a hands-on role where you'll contribute to actual product features and learn industry best practices. Perfect for students looking to build their portfolio and gain professional experience.",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Git"],
    postedDate: "2024-01-15",
    duration: "3-6 months",
    applicants: 24,
  },
  {
    id: "2",
    title: "Marketing Assistant",
    company: "Growth Marketing Agency",
    location: "Remote",
    type: "unpaid",
    description:
      "Learn digital marketing strategies, social media management, and content creation. Perfect for marketing students seeking real-world experience.",
    fullDescription:
      "Join our marketing team and learn the ins and outs of digital marketing. You'll assist with social media campaigns, content creation, email marketing, and analytics. This role is perfect for marketing students who want to build a strong foundation in digital marketing and gain hands-on experience with real clients. You'll learn to use tools like Google Analytics, Mailchimp, and various social media platforms.",
    skills: [
      "Social Media Marketing",
      "Content Creation",
      "Google Analytics",
      "Email Marketing",
      "Creative Writing",
    ],
    postedDate: "2024-01-12",
    duration: "4-8 months",
    applicants: 18,
  },
  {
    id: "3",
    title: "Data Science Intern",
    company: "DataInsight Analytics",
    location: "New York, NY",
    type: "paid",
    description:
      "Work with large datasets, build predictive models, and create data visualizations. Learn Python, SQL, and machine learning techniques.",
    fullDescription:
      "Join our data science team and work on exciting projects involving big data analysis, machine learning, and predictive modeling. You'll learn to use Python, SQL, and various data science libraries like pandas, scikit-learn, and matplotlib. This role involves working with real business data to solve actual problems and create insights that drive business decisions.",
    skills: [
      "Python",
      "SQL",
      "Machine Learning",
      "Data Visualization",
      "Statistics",
    ],
    postedDate: "2024-01-10",
    duration: "6 months",
    applicants: 31,
  },
  {
    id: "4",
    title: "UX/UI Design Intern",
    company: "Creative Design Studio",
    location: "Austin, TX",
    type: "both",
    description:
      "Create beautiful user interfaces and improve user experiences. Work with Figma, Adobe Creative Suite, and learn design principles.",
    fullDescription:
      "Join our design team and work on real projects for clients across various industries. You'll learn to create user-centered designs, conduct user research, create wireframes and prototypes, and collaborate with developers. This role will teach you the complete design process from concept to implementation using modern design tools and methodologies.",
    skills: [
      "Figma",
      "Adobe Creative Suite",
      "User Research",
      "Wireframing",
      "Prototyping",
    ],
    postedDate: "2024-01-08",
    duration: "3-5 months",
    applicants: 15,
  },
  {
    id: "5",
    title: "Business Development Intern",
    company: "Startup Ventures",
    location: "Boston, MA",
    type: "unpaid",
    description:
      "Learn sales strategies, market research, and business development. Help identify new opportunities and build client relationships.",
    fullDescription:
      "Join our business development team and learn the fundamentals of sales, market research, and strategic partnerships. You'll assist with lead generation, market analysis, client presentations, and relationship building. This role is perfect for business students who want to understand how companies grow and develop their professional network.",
    skills: [
      "Sales",
      "Market Research",
      "Presentation Skills",
      "CRM Software",
      "Business Strategy",
    ],
    postedDate: "2024-01-05",
    duration: "4-6 months",
    applicants: 22,
  },
  {
    id: "6",
    title: "Content Writing Intern",
    company: "Digital Content Hub",
    location: "Remote",
    type: "both",
    description:
      "Write engaging content for blogs, social media, and marketing materials. Improve your writing skills and build a portfolio.",
    fullDescription:
      "Join our content team and write engaging articles, social media posts, and marketing copy for various clients. You'll learn SEO best practices, content strategy, and how to write for different audiences and platforms. This role will help you build a strong writing portfolio and understand content marketing fundamentals.",
    skills: [
      "Content Writing",
      "SEO",
      "Social Media",
      "Copywriting",
      "Research",
    ],
    postedDate: "2024-01-03",
    duration: "3-4 months",
    applicants: 19,
  },
];

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "all";
    const limit = parseInt(searchParams.get("limit") || "50");
    const page = parseInt(searchParams.get("page") || "1");

    // For now, return dummy data instead of database data
    // In production, you would query the database here
    let jobs = [...dummyJobs];

    // Apply search filter
    if (search) {
      jobs = jobs.filter(
        job =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase()) ||
          job.skills.some(skill =>
            skill.toLowerCase().includes(search.toLowerCase())
          )
      );
    }

    // Apply type filter
    if (type !== "all") {
      jobs = jobs.filter(job => job.type === type);
    }

    // Apply pagination
    const skip = (page - 1) * limit;
    const paginatedJobs = jobs.slice(skip, skip + limit);

    return NextResponse.json(
      {
        jobs: paginatedJobs,
        pagination: {
          total: jobs.length,
          page,
          limit,
          totalPages: Math.ceil(jobs.length / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get jobs error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
