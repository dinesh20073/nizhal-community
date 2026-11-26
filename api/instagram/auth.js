import { generateOAuthState, getRedirectUri } from './_lib.js';

export default async function handler(req, res) {
  const appId = process.env.META_APP_ID?.trim();
  const redirectUri = getRedirectUri(req);

  if (!appId) {
    return res.status(400).send(`
      <div style="font-family: sans-serif; padding: 40px; text-align: center;">
        <h2>⚠️ Meta App ID Not Configured</h2>
        <p>Please configure <code>META_APP_ID</code> and <code>META_APP_SECRET</code> in your Vercel Environment Variables.</p>
        <p>Expected Redirect URI: <code>${redirectUri}</code></p>
      </div>
    `);
  }

  const state = generateOAuthState(process.env.META_APP_SECRET);
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${encodeURIComponent(
    appId
  )}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=instagram_basic&response_type=code&state=${encodeURIComponent(state)}`;

  return res.redirect(302, authUrl);
}
