interface InstagramTokenResponse {
  access_token: string;
  user_id: string;
}

interface InstagramUserProfile {
  id: string;
  username: string;
  account_type: string;
  media_count: number;
}

interface InstagramMediaResponse {
  data: InstagramMedia[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

interface InstagramMedia {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

class InstagramAPI {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private baseUrl: string;
  private oauthBaseUrl: string;

  constructor() {
    this.clientId = process.env.INSTAGRAM_CLIENT_ID!;
    this.clientSecret = process.env.INSTAGRAM_CLIENT_SECRET!;
    this.redirectUri = process.env.INSTAGRAM_REDIRECT_URI!;
    this.baseUrl = process.env.INSTAGRAM_API_BASE_URL!;
    this.oauthBaseUrl = process.env.INSTAGRAM_OAUTH_BASE_URL!;
  }

  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: 'user_profile,user_media',
      response_type: 'code',
    });

    return `${this.oauthBaseUrl}/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string): Promise<InstagramTokenResponse> {
    const response = await fetch(`${this.oauthBaseUrl}/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUri,
        code,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to exchange code for token: ${error}`);
    }

    return response.json();
  }

  async getLongLivedToken(shortLivedToken: string): Promise<{ access_token: string; expires_in: number }> {
    const params = new URLSearchParams({
      grant_type: 'ig_exchange_token',
      client_secret: this.clientSecret,
      access_token: shortLivedToken,
    });

    const response = await fetch(`${this.baseUrl}/access_token?${params.toString()}`);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get long-lived token: ${error}`);
    }

    return response.json();
  }

  async refreshToken(token: string): Promise<{ access_token: string; expires_in: number }> {
    const params = new URLSearchParams({
      grant_type: 'ig_refresh_token',
      access_token: token,
    });

    const response = await fetch(`${this.baseUrl}/refresh_access_token?${params.toString()}`);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to refresh token: ${error}`);
    }

    return response.json();
  }

  async getUserProfile(accessToken: string): Promise<InstagramUserProfile> {
    const params = new URLSearchParams({
      fields: 'id,username,account_type,media_count',
      access_token: accessToken,
    });

    const response = await fetch(`${this.baseUrl}/me?${params.toString()}`);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get user profile: ${error}`);
    }

    return response.json();
  }

  async getUserMedia(accessToken: string, limit: number = 25): Promise<InstagramMediaResponse> {
    const params = new URLSearchParams({
      fields: 'id,media_type,media_url,permalink,caption,timestamp,like_count,comments_count',
      limit: limit.toString(),
      access_token: accessToken,
    });

    const response = await fetch(`${this.baseUrl}/me/media?${params.toString()}`);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get user media: ${error}`);
    }

    return response.json();
  }

  async getMediaInsights(mediaId: string, accessToken: string): Promise<any> {
    const params = new URLSearchParams({
      metric: 'engagement,impressions,reach,saved',
      access_token: accessToken,
    });

    const response = await fetch(`${this.baseUrl}/${mediaId}/insights?${params.toString()}`);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get media insights: ${error}`);
    }

    return response.json();
  }
}

export const instagramAPI = new InstagramAPI();
export type { InstagramTokenResponse, InstagramUserProfile, InstagramMedia, InstagramMediaResponse };