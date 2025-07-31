import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import OrganizationRole from "@/models/OrganizationRole";
import { verifyToken, extractTokenFromHeader } from "@/lib/auth";
import { z } from "zod";

const organizationRoleSchema = z.object({
  orgName: z.string().min(2, "Organization name must be at least 2 characters"),
  orgEmail: z.string().email("Invalid email address"),
  roleTitle: z.string().min(1, "Role title is required"),
  jobDescription: z
    .string()
    .min(10, "Job description must be at least 10 characters"),
  requiredSkills: z
    .array(z.string().min(1, "Skill cannot be empty"))
    .min(1, "At least one required skill is needed"),
  internshipType: z.enum(["paid", "unpaid"]),
  location: z.string().optional(),
  duration: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Extract and verify token
    const authHeader = request.headers.get("authorization");
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Verify user is an organization
    if (payload.userType !== "organization") {
      return NextResponse.json(
        { error: "Only organizations can post roles" },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validate input
    const validationResult = organizationRoleSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const {
      orgName,
      orgEmail,
      roleTitle,
      jobDescription,
      requiredSkills,
      internshipType,
      location,
      duration,
    } = validationResult.data;

    // Create new organization role
    const organizationRole = await OrganizationRole.create({
      userId: payload.userId,
      orgName,
      orgEmail,
      roleTitle,
      jobDescription,
      requiredSkills,
      internshipType,
      location,
      duration,
    });

    return NextResponse.json(
      {
        message: "Role posted successfully",
        role: organizationRole,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Organization role creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Extract and verify token
    const authHeader = request.headers.get("authorization");
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Get roles posted by the authenticated organization
    const roles = await OrganizationRole.find({ userId: payload.userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ roles }, { status: 200 });
  } catch (error) {
    console.error("Get organization roles error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
