// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectMongoDB from '../../lib/db';
import User from '../../models/user';

export async function POST(request) {
  try {
    await connectMongoDB();
    const reqBody = await request.json();
    const { userName, loginId, password, email, mobile, age, interest } = reqBody;

    // Check if user already exists
    const user = await User.findOne({ loginId });
    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash passwords
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new User({
      userName,
      loginId,
      password: hashedPassword,
      email,
      mobile,
      age,
      interest,
    });

    // Save user
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
