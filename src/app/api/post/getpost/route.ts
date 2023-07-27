import { connect } from '@/dbConfig/dbConfig';
import modelPost from '@/models/postModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextResponse) {
  try {
    const getPost = await modelPost.find();

    return NextResponse.json(
      {
        message: 'Successfuly retrieve all posts',
        getPost,
        status: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
