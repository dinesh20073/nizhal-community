import crypto from 'crypto';

// In-memory cache for serverless invocation reuse
let cache = {
  data: null,
  timestamp: 0,
  ttl: 15 * 60 * 1000, // 15 minutes TTL
};

/**
 * Fallback media for @nizhal.community to ensure the gallery is graceful
 * even before Meta Developer credentials are provided or if Meta rate-limits.
 */
// Empty fallback - do not return random fake posts when deployed
export const FALLBACK_INSTAGRAM_POSTS = [];

/**
 * Creates a cryptographically signed OAuth state parameter with timestamp
 * to protect against CSRF attacks during the OAuth redirection flow.
 */
export function generateOAuthState(secretKey) {
  const secret = secretKey || process.env.META_APP_SECRET || 'nizhal_oauth_salt_fallback';
  const timestamp = Date.now();
  const randomBytes = crypto.randomBytes(16).toString('hex');
  const payload = `${timestamp}:${randomBytes}`;
  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return Buffer.from(`${payload}:${hmac}`).toString('base64url');
}

/**
 * Validates the OAuth state parameter against CSRF and checks freshness (10 min TTL).
 */
export function verifyOAuthState(stateStr, secretKey) {
  if (!stateStr) return false;
  try {
    const decoded = Buffer.from(stateStr, 'base64url').toString('utf8');
    const [timestampStr, randomBytes, receivedHmac] = decoded.split(':');
    if (!timestampStr || !randomBytes || !receivedHmac) return false;

    const timestamp = parseInt(timestampStr, 10);
    // 10-minute expiry window for completing login
    if (Date.now() - timestamp > 10 * 60 * 1000) return false;

    const secret = secretKey || process.env.META_APP_SECRET || 'nizhal_oauth_salt_fallback';
    const payload = `${timestamp}:${randomBytes}`;
    const expectedHmac = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    return crypto.timingSafeEqual(Buffer.from(receivedHmac), Buffer.from(expectedHmac));
  } catch (err) {
    return false;
  }
}

/**
 * Resolves the configured Redirect URI, falling back to Vercel/host headers if not explicitly set.
 */
export function getRedirectUri(req) {
  if (process.env.INSTAGRAM_REDIRECT_URI) {
    return process.env.INSTAGRAM_REDIRECT_URI.trim();
  }

  // Derive from request host if hosted on Vercel
  const host = req?.headers?.['x-forwarded-host'] || req?.headers?.host || 'localhost:5173';
  const proto = req?.headers?.['x-forwarded-proto'] || (host.includes('localhost') ? 'http' : 'https');
  return `${proto}://${host}/api/instagram/callback`;
}

/**
 * Fetches media from Instagram Graph API using the server-side access token.
 */
export async function fetchInstagramMedia(limit = 12) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const userId = process.env.INSTAGRAM_USER_ID?.trim() || 'me';

  // Check in-memory cache
  const now = Date.now();
  if (cache.data && now - cache.timestamp < cache.ttl) {
    return {
      success: true,
      cached: true,
      configured: true,
      account: '@nizhal.community',
      media: cache.data.slice(0, limit),
    };
  }

  // If token is missing, do not show random posts
  if (!token) {
    return {
      success: true,
      configured: false,
      isFallback: true,
      account: '@nizhal.community',
      message: 'Instagram access token not configured yet.',
      media: [],
    };
  }

  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';

  // Construct prioritized candidate endpoints based on token & user configuration
  const candidateEndpoints = [];
  if (userId && userId !== 'me') {
    candidateEndpoints.push(`https://graph.instagram.com/v21.0/${userId}/media?fields=${fields}&access_token=${encodeURIComponent(token)}&limit=${limit}`);
    candidateEndpoints.push(`https://graph.facebook.com/v21.0/${userId}/media?fields=${fields}&access_token=${encodeURIComponent(token)}&limit=${limit}`);
  }
  candidateEndpoints.push(`https://graph.instagram.com/me/media?fields=${fields}&access_token=${encodeURIComponent(token)}&limit=${limit}`);

  let lastError = null;

  for (const endpoint of candidateEndpoints) {
    try {
      const res = await fetch(endpoint, {
        headers: { Accept: 'application/json' },
      });

      const data = await res.json();

      if (res.ok && !data.error && Array.isArray(data.data)) {
        const items = data.data;

        // Filter and normalize media items
        const normalized = items.map((item) => ({
          id: item.id,
          caption: item.caption || '',
          media_type: item.media_type || 'IMAGE',
          media_url: item.media_url || item.thumbnail_url || '',
          thumbnail_url: item.thumbnail_url || item.media_url || '',
          permalink: item.permalink || 'https://www.instagram.com/nizhal.community/',
          timestamp: item.timestamp || new Date().toISOString(),
        }));

        // Save to serverless cache
        cache.data = normalized;
        cache.timestamp = now;

        return {
          success: true,
          configured: true,
          cached: false,
          account: '@nizhal.community',
          media: normalized.slice(0, limit),
        };
      } else if (data.error) {
        lastError = data.error.message || 'API error';
      }
    } catch (err) {
      lastError = err.message || 'Network error';
    }
  }

  console.warn('Instagram Graph API response error across endpoints:', lastError);

  // If we have stale cache, return it instead of failing
  if (cache.data) {
    return {
      success: true,
      cached: true,
      stale: true,
      configured: true,
      account: '@nizhal.community',
      media: cache.data.slice(0, limit),
      warning: lastError || 'Fetched from stale cache',
    };
  }

  // When deployed with credentials, strictly return live media or actual status without random fallback posts
  return {
    success: false,
    configured: true,
    isFallback: false,
    account: '@nizhal.community',
    message: lastError || 'Could not fetch live media from Instagram Graph API.',
    error: lastError,
    media: [],
  };
}

