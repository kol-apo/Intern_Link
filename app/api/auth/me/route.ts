import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { verifyToken, extractTokenFromHeader } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Extract token from Authorization header
    const authHeader = request.headers.get("authorization");
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // Verify token
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Find user
    const user = await User.findById(payload.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return user data (without password)
    const userResponse = user.toJSON();

    return NextResponse.json(
      {
        user: userResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
