import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Users from '@/models/userModel';
import bcryptjs from 'bcryptjs';
connect();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const response = await request.json();
    const { username, email, password } = response;

    //check user is already exist

    const userExist = await Users.findOne({ email });
    if (userExist) {
      return NextResponse.json({
        message: 'User already exist',
        status: false,
      });
    }

    if (userExist) {
      return NextResponse.json(
        { message: 'Sorry User already exist', status: false },
        { status: 401 }
      );
    }

    //hashPassword
    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);

    const regUser = await new Users({
      username,
      email,
      password: hashedPass,
    });
    const newUser = await regUser.save();

    return NextResponse.json(
      { message: 'New User has been created', status: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
