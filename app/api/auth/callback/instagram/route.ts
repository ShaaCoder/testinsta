import { NextRequest, NextResponse } from 'next/server';
import { instagramAPI } from '@/lib/instagram-api';
import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/?error=instagram_auth_failed`);
    }

    if (!code) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/?error=missing_code`);
    }

    // Exchange code for short-lived token
    const tokenResponse = await instagramAPI.exchangeCodeForToken(code);
    
    // Get long-lived token
    const longLivedToken = await instagramAPI.getLongLivedToken(tokenResponse.access_token);
    
    // Get user profile
    const profile = await instagramAPI.getUserProfile(longLivedToken.access_token);

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('instagram_automation');
    const users = db.collection('users');

    // Check if user exists
    let user = await users.findOne({ instagramId: profile.id });

    if (!user) {
      // Create new user
      const newUser = {
        instagramId: profile.id,
        username: profile.username,
        accountType: profile.account_type,
        mediaCount: profile.media_count,
        accessToken: longLivedToken.access_token,
        tokenExpiresAt: new Date(Date.now() + longLivedToken.expires_in * 1000),
        name: profile.username,
        email: `${profile.username}@instagram.local`,
        role: 'user',
        instagramConnected: true,
        instagramUsername: profile.username,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await users.insertOne(newUser);
      user = { ...newUser, _id: result.insertedId };
    } else {
      // Update existing user
      await users.updateOne(
        { _id: user._id },
        {
          $set: {
            username: profile.username,
            accountType: profile.account_type,
            mediaCount: profile.media_count,
            accessToken: longLivedToken.access_token,
            tokenExpiresAt: new Date(Date.now() + longLivedToken.expires_in * 1000),
            instagramConnected: true,
            instagramUsername: profile.username,
            updatedAt: new Date(),
          },
        }
      );
    }

    // Create JWT token
    const jwtToken = jwt.sign(
      {
        userId: user._id.toString(),
        instagramId: profile.id,
        username: profile.username,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // Redirect to dashboard with token
    const response = NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard`);
    response.cookies.set('auth_token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Instagram callback error:', error);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/?error=auth_callback_failed`);
  }
}