import { connect } from '@/dbConfig/dbConfig';
import modelPost from '@/models/postModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function PUT(request: NextRequest) {
  try {
    const response = await request.json();

    const { productName, color, price } = response.post;
    const { id } = response;

    const updatedPost = await modelPost.findByIdAndUpdate(
      id,
      {
        productName,
        color,
        price,
      },
      { new: true }
    );

    if (updatedPost) {
      return NextResponse.json(
        { message: 'Post updated', updatedPost: updatedPost, status: true },
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
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
