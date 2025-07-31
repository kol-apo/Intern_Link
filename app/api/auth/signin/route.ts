import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { comparePassword, generateToken } from "@/lib/auth";
import { z } from "zod";

const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validate input
    const validationResult = signinSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

    // Find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return user data (without password) and token
    const userResponse = user.toJSON();

    return NextResponse.json(
      {
        message: "Login successful",
        user: userResponse,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
