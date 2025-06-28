import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

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

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return user data (excluding sensitive information)
    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role || 'user',
      instagramConnected: user.instagramConnected || false,
      instagramUsername: user.instagramUsername,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}