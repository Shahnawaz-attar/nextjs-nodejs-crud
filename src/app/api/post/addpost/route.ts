import { connect } from '@/dbConfig/dbConfig';
import modelPost from '@/models/postModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();

    const { productName, color, price } = response.post;

    const post = await new modelPost({ productName, color, price });
    const savesPost = post.save();

    return NextResponse.json(
      { message: 'Post added successfuly', savesPost, status: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
