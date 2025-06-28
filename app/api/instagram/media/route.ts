import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { instagramAPI } from '@/lib/instagram-api';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('instagram_automation');
    const users = db.collection('users');

    // Get user from database
    const user = await users.findOne({ _id: new ObjectId(decoded.userId) });

    if (!user || !user.accessToken) {
      return NextResponse.json({ error: 'Instagram not connected' }, { status: 404 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '25');

    // Get user media
    const media = await instagramAPI.getUserMedia(user.accessToken, limit);

    return NextResponse.json(media);
  } catch (error) {
    console.error('Media fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}