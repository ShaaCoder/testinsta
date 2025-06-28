import { NextRequest, NextResponse } from 'next/server';
import { instagramAPI } from '@/lib/instagram-api';

export async function GET(request: NextRequest) {
  try {
    const authUrl = instagramAPI.getAuthUrl();
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Instagram auth error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate Instagram authentication' },
      { status: 500 }
    );
  }
}