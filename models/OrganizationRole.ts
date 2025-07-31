import mongoose from "mongoose";

export interface IOrganizationRole {
  _id: string;
  userId: string;
  orgName: string;
  orgEmail: string;
  roleTitle: string;
  jobDescription: string;
  requiredSkills: string[];
  internshipType: string;
  location?: string;
  duration?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const organizationRoleSchema = new mongoose.Schema<IOrganizationRole>(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
      ref: "User",
    },
    orgName: {
      type: String,
      required: [true, "Organization name is required"],
      trim: true,
    },
    orgEmail: {
      type: String,
      required: [true, "Organization email is required"],
      lowercase: true,
      trim: true,
    },
    roleTitle: {
      type: String,
      required: [true, "Role title is required"],
      trim: true,
    },
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
    },
    requiredSkills: [
      {
        type: String,
        required: [true, "At least one required skill is needed"],
        trim: true,
      },
    ],
    internshipType: {
      type: String,
      required: [true, "Internship type is required"],
      enum: ["paid", "unpaid"],
    },
    location: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
organizationRoleSchema.index({ userId: 1 });
organizationRoleSchema.index({ requiredSkills: 1 });
organizationRoleSchema.index({ internshipType: 1 });
organizationRoleSchema.index({ isActive: 1 });
organizationRoleSchema.index({ createdAt: -1 });

export default mongoose.models.OrganizationRole ||
  mongoose.model<IOrganizationRole>("OrganizationRole", organizationRoleSchema);
