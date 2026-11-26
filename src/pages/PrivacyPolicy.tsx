// Local Artwork Assets
import bodyBgUrl from '../assets/body.png';
import bodyMobileBgUrl from '../assets/body-mobile.png';

const PrivacyPolicy = () => {
  return (
    <div className="relative bg-[#f7f3ee] text-[#2b2622] min-h-screen overflow-x-hidden selection:bg-[#8c3a3a]/20">
      {/* Organic Warm Background Texture */}
      <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 opacity-20">
        <picture>
          <source media="(max-width: 768px)" srcSet={bodyMobileBgUrl} />
          <img src={bodyBgUrl} alt="Background Texture" className="w-full h-full object-cover" />
        </picture>
      </div>

      <div className="relative z-10 pt-28 pb-24 px-4 sm:px-8 md:px-12 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="font-['Caveat'] text-[#8c3a3a] text-3xl sm:text-4xl font-bold mb-1">
            transparency & care ♡
          </p>
          <h1 className="hero-title font-medium text-4xl sm:text-5xl md:text-6xl text-[#2b2622] tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#2b2622]/60">
            Last updated: November 2026
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-[#fcfaf8]/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 md:p-12 border border-[#2b2622]/10 shadow-lg space-y-8 text-sm sm:text-base leading-relaxed text-[#2b2622]/85">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#2b2622] mb-3">
              1. Overview
            </h2>
            <p>
              Welcome to <strong>Nizhal Community</strong>. We are a community dedicated to creating safe, grounded spaces for human connection, deep conversations, and shared moments. This Privacy Policy outlines how we treat data on our website and through our Instagram integration.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#2b2622] mb-3">
              2. Instagram API Integration & Public Displays
            </h2>
            <p className="mb-3">
              Our website integrates with the official Meta / Instagram Graph API to display our community's publicly shared moments, gatherings, and event reflections directly from our public Instagram account: <strong>@nizhal.community</strong>.
            </p>
            <p className="mb-2 font-medium text-[#2b2622]">
              The Instagram data accessed and displayed includes:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-[#2b2622]/80">
              <li><strong>Public Profile Information:</strong> Account handle (<code>@nizhal.community</code>) and public profile details.</li>
              <li><strong>Media URLs & Thumbnails:</strong> Publicly posted photos, carousel albums, and video Reels from our gatherings.</li>
              <li><strong>Captions & Text:</strong> Text descriptions, notes, and hashtags accompanying our public posts.</li>
              <li><strong>Permalinks & Timestamps:</strong> Direct web links to the public posts on Instagram and their publication dates.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#2b2622] mb-3">
              3. Secure Server Storage & Token Protection
            </h2>
            <p>
              All Instagram API access tokens, client credentials, and server keys are strictly stored on private, server-side environment configurations. They are <strong>never</strong> included in client-side code, never bundled into public browser scripts, and never exposed to website visitors. All API requests are processed through secure serverless backend routes.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#2b2622] mb-3">
              4. We Do Not Sell Personal Data
            </h2>
            <p>
              We value human privacy and trust. We do not sell, rent, monetize, or trade your personal data, contact submissions, or visitor information to any third parties, advertisers, or data brokers.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#2b2622] mb-3">
              5. Contact Us & Data Deletion Requests
            </h2>
            <p className="mb-3">
              If you have any questions regarding your privacy, if your photo or video appears in our gathering highlights and you wish to have it removed, or if you wish to submit a data deletion request, you can contact us at any time:
            </p>
            <div className="bg-[#ede4d8]/70 rounded-2xl p-4 sm:p-5 border border-[#2b2622]/10 space-y-2 text-sm">
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:nizhal.community@gmail.com?subject=Privacy%20or%20Data%20Request"
                  className="text-[#8c3a3a] hover:underline font-semibold"
                >
                  nizhal.community@gmail.com
                </a>
              </p>
              <p>
                <strong>Community Instagram:</strong>{' '}
                <a
                  href="https://www.instagram.com/nizhal.community/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#8c3a3a] hover:underline"
                >
                  @nizhal.community
                </a>
              </p>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-[#2b2622]/70">
              We respond to all inquiries and content removal requests with genuine care and prompt attention, typically within 24–48 hours.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#2b2622] mb-3">
              6. Updates to This Policy
            </h2>
            <p>
              We may occasionally update this Privacy Policy as our community initiatives grow. Any changes will be posted directly to this public page with the updated revision date.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-14 text-center">
          <p className="font-['Caveat'] text-[#8c3a3a] text-2xl sm:text-3xl font-bold mb-1">
            held with care and respect ♡
          </p>
          <p className="text-xs text-[#2b2622]/60">
            Nizhal Community
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
