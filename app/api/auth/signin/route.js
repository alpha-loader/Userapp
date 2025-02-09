// app/api/auth/signin/route.js
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectMongoDB from '../../lib/db';
import User from '../../models/user';

export async function POST(request) {
  try {
    await connectMongoDB();
    const reqBody = await request.json();
    const { loginId, password } = reqBody;

    // Check if user exists
    const user = await User.findOne({ loginId });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    // Check password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Create JWT token
    const tokenData = {
      id: user._id,
      loginId: user.loginId,
    };
    const token = jwt.sign(tokenData, process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: '24h' });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      token: token,
      user: user.userName
    });

    return response;

  } catch (error) {
    console.error("Error during signin:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
