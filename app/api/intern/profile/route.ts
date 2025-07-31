import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import InternProfile from "@/models/InternProfile";
import { verifyToken, extractTokenFromHeader } from "@/lib/auth";
import { z } from "zod";

const internProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  education: z.enum([
    "high-school",
    "undergraduate",
    "graduate",
    "postgraduate",
  ]),
  skills: z
    .array(z.string().min(1, "Skill cannot be empty"))
    .min(1, "At least one skill is required"),
  desiredRole: z.string().min(1, "Desired role is required"),
  openTo: z.enum(["paid", "unpaid", "both"]),
  cvBase64: z.string().optional(),
  cvFileName: z.string().optional(),
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

    // Verify user is an intern
    if (payload.userType !== "intern") {
      return NextResponse.json(
        { error: "Only interns can create intern profiles" },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validate input
    const validationResult = internProfileSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      education,
      skills,
      desiredRole,
      openTo,
      cvBase64,
      cvFileName,
    } = validationResult.data;

    // Check if profile already exists for this user
    const existingProfile = await InternProfile.findOne({
      userId: payload.userId,
    });
    if (existingProfile) {
      return NextResponse.json(
        { error: "Profile already exists for this user" },
        { status: 409 }
      );
    }

    // Create new intern profile
    const internProfile = await InternProfile.create({
      userId: payload.userId,
      name,
      email,
      education,
      skills,
      desiredRole,
      openTo,
      cvBase64,
      cvFileName,
    });

    return NextResponse.json(
      {
        message: "Intern profile created successfully",
        profile: internProfile,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Intern profile creation error:", error);
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

    // Get profile for the authenticated user
    const profile = await InternProfile.findOne({ userId: payload.userId });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    console.error("Get intern profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
