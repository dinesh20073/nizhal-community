import { verifyOAuthState, getRedirectUri } from './_lib.js';

export default async function handler(req, res) {
  const { code, state, error, error_description } = req.query;

  if (error) {
    return res.status(400).send(`<h3>Authorization error: ${error_description || error}</h3>`);
  }

  if (!code) {
    return res.status(400).send('<h3>Missing authorization code.</h3>');
  }

  const isValidState = verifyOAuthState(state, process.env.META_APP_SECRET);
  if (!isValidState) {
    return res.status(403).send('<h3>Invalid or expired OAuth state parameter (CSRF protection).</h3>');
  }

  const appId = process.env.META_APP_ID?.trim();
  const appSecret = process.env.META_APP_SECRET?.trim();
  const redirectUri = getRedirectUri(req);

  try {
    const tokenFormData = new URLSearchParams();
    tokenFormData.append('client_id', appId);
    tokenFormData.append('client_secret', appSecret);
    tokenFormData.append('grant_type', 'authorization_code');
    tokenFormData.append('redirect_uri', redirectUri);
    tokenFormData.append('code', code);

    const shortTokenRes = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      body: tokenFormData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const shortTokenData = await shortTokenRes.json();
    if (!shortTokenRes.ok || !shortTokenData.access_token) {
      return res.status(400).send(`<h3>Token exchange error: ${JSON.stringify(shortTokenData)}</h3>`);
    }

    const longTokenUrl = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${encodeURIComponent(
      appSecret
    )}&access_token=${encodeURIComponent(shortTokenData.access_token)}`;

    const longTokenRes = await fetch(longTokenUrl, { method: 'GET' });
    const longTokenData = await longTokenRes.json();
    const finalToken = longTokenData.access_token || shortTokenData.access_token;

    return res.status(200).send(`
      <div style="font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 24px; border: 1px solid #ddd; border-radius: 12px;">
        <h2 style="color: #15803d;">🎉 Instagram Authorized Successfully!</h2>
        <p>Save this token into your <code>.env</code> and Vercel Environment Variables as <code>INSTAGRAM_ACCESS_TOKEN</code>:</p>
        <textarea style="width: 100%; height: 100px; font-family: monospace; padding: 8px;">${finalToken}</textarea>
        <p><a href="/events" style="color: #8c3a3a; font-weight: bold;">← Return to Events Page</a></p>
      </div>
    `);
  } catch (err) {
    return res.status(500).send(`<h3>Server error: ${err.message}</h3>`);
  }
}
