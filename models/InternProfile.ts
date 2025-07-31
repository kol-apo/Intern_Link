import mongoose from "mongoose";

export interface IInternProfile {
  _id: string;
  userId: string;
  name: string;
  email: string;
  education: string;
  skills: string[];
  cvBase64?: string;
  cvFileName?: string;
  desiredRole: string;
  openTo: string;
  createdAt: Date;
  updatedAt: Date;
}

const internProfileSchema = new mongoose.Schema<IInternProfile>(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    education: {
      type: String,
      required: [true, "Education level is required"],
      enum: ["high-school", "undergraduate", "graduate", "postgraduate"],
    },
    skills: [
      {
        type: String,
        required: [true, "At least one skill is required"],
        trim: true,
      },
    ],
    cvBase64: {
      type: String,
      trim: true,
    },
    cvFileName: {
      type: String,
      trim: true,
    },
    desiredRole: {
      type: String,
      required: [true, "Desired role is required"],
      trim: true,
    },
    openTo: {
      type: String,
      required: [true, "Open to preference is required"],
      enum: ["paid", "unpaid", "both"],
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
internProfileSchema.index({ userId: 1 });
internProfileSchema.index({ skills: 1 });
internProfileSchema.index({ desiredRole: 1 });
internProfileSchema.index({ openTo: 1 });

export default mongoose.models.InternProfile ||
  mongoose.model<IInternProfile>("InternProfile", internProfileSchema);
