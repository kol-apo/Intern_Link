import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import InternProfile from "@/models/InternProfile";
import { verifyToken, extractTokenFromHeader } from "@/lib/auth";

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

    // Verify user is an organization
    if (payload.userType !== "organization") {
      return NextResponse.json(
        { error: "Only organizations can access matching" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const requiredSkills = searchParams.get("skills")?.split(",") || [];
    const limit = parseInt(searchParams.get("limit") || "10");

    if (requiredSkills.length === 0) {
      return NextResponse.json(
        { error: "Required skills parameter is needed" },
        { status: 400 }
      );
    }

    // Build query to find interns with matching skills
    const query: any = {};

    if (requiredSkills.length > 0) {
      query.skills = {
        $in: requiredSkills.map(skill => new RegExp(skill.trim(), "i")),
      };
    }

    // Find matching interns
    const matchingInterns = await InternProfile.find(query)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    // Calculate match score for each intern
    const scoredInterns = matchingInterns.map(intern => {
      const matchingSkills = intern.skills.filter(skill =>
        requiredSkills.some(
          reqSkill =>
            skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
            reqSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );

      const matchScore = (matchingSkills.length / requiredSkills.length) * 100;

      return {
        id: intern._id,
        userId: intern.userId,
        name: intern.name,
        email: intern.email,
        education: intern.education,
        skills: intern.skills,
        desiredRole: intern.desiredRole,
        openTo: intern.openTo,
        matchScore: Math.round(matchScore),
        matchingSkills,
        createdAt: intern.createdAt,
      };
    });

    // Sort by match score (highest first)
    scoredInterns.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json(
      {
        interns: scoredInterns,
        total: scoredInterns.length,
        requiredSkills,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Matching interns error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
