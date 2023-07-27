import { connect } from '@/dbConfig/dbConfig';
import modelPost from '@/models/postModel';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    await modelPost.findByIdAndDelete(id);
    return NextResponse.json(
      { message: 'Post deleted successfuly', status: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
