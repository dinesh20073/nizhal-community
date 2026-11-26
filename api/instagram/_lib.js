import crypto from 'crypto';

// In-memory cache for serverless invocation reuse
let cache = {
  data: null,
  timestamp: 0,
  ttl: 15 * 60 * 1000, // 15 minutes TTL
};

// Empty fallback - do not return random fake posts when deployed
export const FALLBACK_INSTAGRAM_POSTS = [];

const ELFSIGHT_WIDGET_ID = '9582f15f-fa64-4a65-b20d-4533e7869f05';

/**
 * Fetches real-time Instagram posts & reels directly from the Elfsight feed stream
 * for @nizhal.community (https://9582f15ffa644a65b20d4533e7869f05.elf.site/).
 * This retrieves all clean post media (photos, carousel albums, reels) without any
 * third-party watermarks or branding links.
 */
export async function fetchElfsightFeed(limit = 100) {
  try {
    const bootUrl = `https://core.service.elfsight.com/p/boot/?w=${ELFSIGHT_WIDGET_ID}`;
    const bootRes = await fetch(bootUrl, {
      headers: { Accept: 'application/json' },
    });
    if (!bootRes.ok) return null;
    const bootData = await bootRes.json();
    const widget = bootData?.data?.widgets?.[ELFSIGHT_WIDGET_ID];
    if (!widget) return null;

    const token = widget.data?.public_widget_token;
    const sourcePID = widget.data?.settings?.sources?.[0]?.sourcePID;
    if (!token || !sourcePID) return null;

    const postUrl = `https://widget-data.service.elfsight.com/api/posts?sources%5B%5D=${encodeURIComponent(
      JSON.stringify({ pid: sourcePID, filters: [] })
    )}&limit=${limit}`;

    const postsRes = await fetch(postUrl, {
      headers: {
        Accept: 'application/json',
        'x-widget-token': token,
      },
    });

    if (!postsRes.ok) return null;
    const postsData = await postsRes.json();
    const items = postsData?.payload || [];

    if (!Array.isArray(items) || items.length === 0) return null;

    // Find the authentic Nizhal profile picture from the feed posts
    const nizhalAuthor = items.find((p) => p.author?.username?.toLowerCase().includes('nizhal'));
    const nizhalProfilePic = nizhalAuthor?.author?.profilePictureUrl || '';

    return items.map((p) => {
      const isVideo = p.type === 'reel';
      const firstMedia = p.media?.[0] || {};
      const videoMedia = p.media?.find((m) => m.type === 'video') || firstMedia;

      let mediaUrl = '';
      let thumbUrl = '';

      if (isVideo) {
        mediaUrl = videoMedia.url || firstMedia.url || firstMedia.thumbnail?.url || '';
        thumbUrl = videoMedia.cover?.thumbnail?.url || firstMedia.thumbnail?.url || '';
      } else {
        mediaUrl = firstMedia.thumbnail?.url || firstMedia.url || '';
        thumbUrl = firstMedia.thumbnail?.url || '';
      }

      const rawMediaList = (p.media || []).map((m) => {
        const isMedVideo = m.type === 'video';
        return {
          type: isMedVideo ? 'video' : 'image',
          url: isMedVideo ? (m.url || m.thumbnail?.url || '') : (m.thumbnail?.url || m.url || ''),
          thumbnail: m.thumbnail?.url || m.cover?.thumbnail?.url || '',
        };
      });

      return {
        id: p.vendorId || p.link || `ig-${Math.random().toString(36).slice(2, 9)}`,
        caption: p.caption || '',
        media_type: isVideo ? 'VIDEO' : (p.type === 'album' ? 'CAROUSEL_ALBUM' : 'IMAGE'),
        media_url: mediaUrl,
        thumbnail_url: thumbUrl || mediaUrl,
        permalink: p.link || 'https://www.instagram.com/nizhal.community/',
        timestamp: p.publishedAt || new Date().toISOString(),
        likesCount: p.likesCount ?? 0,
        commentsCount: p.commentsCount ?? 0,
        // Always strictly display Nizhal Community identity, never collaborator accounts (e.g. unbored.cafe)
        author: {
          username: 'nizhal.community',
          name: 'Nizhal Community',
          profilePictureUrl: nizhalProfilePic || p.author?.profilePictureUrl || '',
        },
        slides: rawMediaList.length > 0 ? rawMediaList : [
          { type: isVideo ? 'video' : 'image', url: mediaUrl, thumbnail: thumbUrl }
        ],
      };
    });
  } catch (err) {
    console.warn('Error fetching from Elfsight feed stream:', err.message);
    return null;
  }
}

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
 * Fetches media exclusively from https://9582f15ffa644a65b20d4533e7869f05.elf.site/
 */
export async function fetchInstagramMedia(limit = 100) {
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

  // Fetch all posts from the live feed stream
  const elfsightItems = await fetchElfsightFeed(limit);
  if (elfsightItems && elfsightItems.length > 0) {
    cache.data = elfsightItems;
    cache.timestamp = now;

    return {
      success: true,
      configured: true,
      cached: false,
      account: '@nizhal.community',
      media: elfsightItems.slice(0, limit),
    };
  }

  // If stale cache exists, return it
  if (cache.data) {
    return {
      success: true,
      cached: true,
      stale: true,
      configured: true,
      account: '@nizhal.community',
      media: cache.data.slice(0, limit),
    };
  }

  return {
    success: true,
    configured: false,
    isFallback: true,
    account: '@nizhal.community',
    message: 'Instagram feed syncing.',
    media: [],
  };
}
