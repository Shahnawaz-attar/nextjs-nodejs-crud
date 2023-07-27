import { connect } from '@/dbConfig/dbConfig';
import Users from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
connect();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const response = await request.json();
    const { email, password } = response;

    const userByEmail = await Users.findOne({ email });

    if (!userByEmail) {
      return NextResponse.json({ message: 'User not exist ', status: false });
    }

    const comparePass = await bcryptjs.compare(password, userByEmail.password);

    if (!comparePass) {
      return NextResponse.json({ message: 'Password is wrong', status: false });
    }

    const tokenData = {
      userId: userByEmail._id,
      userEmail: userByEmail.email,
      userName: userByEmail.username,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '10h',
    });

    const responseNext = NextResponse.json(
      { message: 'Login Successful', status: true },
      { status: 200 }
    );

    responseNext.cookies.set('token', token, { httpOnly: true });

    return responseNext;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
