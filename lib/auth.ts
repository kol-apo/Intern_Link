import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUser } from "@/models/User";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

export interface JWTPayload {
  userId: string;
  email: string;
  userType: "intern" | "organization";
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: IUser): string {
  const payload: JWTPayload = {
    userId: user._id,
    email: user.email,
    userType: user.userType,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function extractTokenFromHeader(
  authHeader: string | undefined
): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}
