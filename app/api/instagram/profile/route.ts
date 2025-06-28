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

    // Check if token needs refresh
    const now = new Date();
    if (user.tokenExpiresAt && new Date(user.tokenExpiresAt) <= now) {
      try {
        const refreshedToken = await instagramAPI.refreshToken(user.accessToken);
        
        // Update token in database
        await users.updateOne(
          { _id: user._id },
          {
            $set: {
              accessToken: refreshedToken.access_token,
              tokenExpiresAt: new Date(Date.now() + refreshedToken.expires_in * 1000),
              updatedAt: new Date(),
            },
          }
        );

        user.accessToken = refreshedToken.access_token;
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return NextResponse.json({ error: 'Token refresh failed' }, { status: 401 });
      }
    }

    // Get fresh profile data
    const profile = await instagramAPI.getUserProfile(user.accessToken);

    return NextResponse.json({
      id: profile.id,
      username: profile.username,
      accountType: profile.account_type,
      mediaCount: profile.media_count,
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}