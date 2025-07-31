import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import InternProfile from "@/models/InternProfile";
import { verifyToken, extractTokenFromHeader } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
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

    // Verify user is an organization (only organizations can view CVs)
    if (payload.userType !== "organization") {
      return NextResponse.json(
        { error: "Only organizations can view CVs" },
        { status: 403 }
      );
    }

    const { userId } = params;

    // Get intern profile
    const profile = await InternProfile.findOne({ userId });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    if (!profile.cvBase64) {
      return NextResponse.json({ error: "CV not found" }, { status: 404 });
    }

    // Determine file type from filename
    const fileName = profile.cvFileName || "cv.pdf";
    let contentType = "application/pdf";

    if (fileName.endsWith(".doc")) {
      contentType = "application/msword";
    } else if (fileName.endsWith(".docx")) {
      contentType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }

    // Convert base64 back to buffer
    const buffer = Buffer.from(profile.cvBase64, "base64");

    // Return the file
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${fileName}"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Get CV error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
