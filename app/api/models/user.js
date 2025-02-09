import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide a username!"],
    },
    loginId: {
      type: String,
      required: [true, "Please provide a login ID!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password!"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email!"],
    },
    mobile: {
      type: String,
      required: [true, "Please provide a mobile number!"],
    },
    age: {
      type: Number,
    },
    interest: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
