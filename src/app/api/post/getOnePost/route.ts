import { connect } from '@/dbConfig/dbConfig';
import modelPost from '@/models/postModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    const post = await modelPost.findById(id);
    if (post) {
      return NextResponse.json(
        { message: 'Post found', getPost: post, status: true },
        { status: 200 }
      );
    } else {
      // If the post is not found, send an error response to the frontend
      return NextResponse.json(
        { status: false, message: 'Post not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
