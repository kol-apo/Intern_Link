import mongoose from 'mongoose';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  userType: 'intern' | 'organization';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    userType: {
      type: String,
      enum: ['intern', 'organization'],
      required: [true, 'User type is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Index for email queries
userSchema.index({ email: 1 });

// Prevent password from being returned in queries
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema); 