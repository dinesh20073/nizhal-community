import { fetchInstagramMedia } from './_lib.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 12, 50);
    const result = await fetchInstagramMedia(limit);
    res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=3600');
    return res.status(200).json(result);
  } catch (err) {
    console.error('Error fetching Instagram media:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
