import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ExternalLink, RefreshCw, X } from 'lucide-react';

// Local Artwork Assets
import bodyBgUrl from '../assets/body.png';
import bodyMobileBgUrl from '../assets/body-mobile.png';

export interface ScrapbookItem {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  media_type: 'image' | 'video' | 'link';
  sort_order: number;
  created_at: string;
  // UI styling properties
  rotation: string;
  widthClass: string;
  tapePosition: 'top' | 'top-right' | 'top-left';
  displayUrl: string;
}

// Fallback seed memories if API is momentarily unreachable
const FALLBACK_MEMORIES = [
  {
    id: 'fb-1',
    title: 'Human. Stories. Connection.',
    description: 'listening deeply, no rush, just warmth ♡',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    category: 'general',
    media_type: 'image' as const,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fb-2',
    title: 'Circle by the Sea',
    description: 'real conversations with good souls ✨',
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    category: 'general',
    media_type: 'image' as const,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'fb-3',
    title: 'Campfire Reflections',
    description: 'laughter echoing under starlit skies 🌿',
    url: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=1200&q=80',
    category: 'general',
    media_type: 'image' as const,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
];

/**
 * Normalizes Google Drive links into direct thumbnail / preview URLs
 */
function resolveMediaUrl(rawUrl: string, mediaType: string): string {
  if (!rawUrl) return '';
  if (rawUrl.includes('drive.google.com')) {
    const fileIdMatch =
      rawUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
      rawUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
      rawUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);

    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      if (mediaType === 'video') {
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
      return `https://lh3.googleusercontent.com/d/${fileId}=w1200`;
    }
  }
  return rawUrl;
}

const ROTATIONS = ['-rotate-2', 'rotate-3', '-rotate-3', 'rotate-2', '-rotate-1', 'rotate-1'];
const WIDTH_CLASSES = ['w-full sm:w-80', 'w-full sm:w-76', 'w-full sm:w-84'];
const TAPE_POSITIONS: ('top' | 'top-right' | 'top-left')[] = ['top', 'top-right', 'top-left'];

const Media = () => {
  const [items, setItems] = useState<ScrapbookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState<ScrapbookItem | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch live media from Media API Backend
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const globalProcess = (globalThis as unknown as { process?: { env?: Record<string, string> } })?.process;
    const apiUrl =
      import.meta.env.VITE_MEDIA_API_URL ||
      globalProcess?.env?.NEXT_PUBLIC_MEDIA_API_URL ||
      'http://localhost:3001/api/media';

    async function loadMedia() {
      try {
        const res = await fetch(apiUrl, {
          headers: { Accept: 'application/json' },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const rawList = Array.isArray(data.media) ? data.media : FALLBACK_MEMORIES;

        const formatted: ScrapbookItem[] = rawList.map((item: any, idx: number) => ({
          ...item,
          rotation: ROTATIONS[idx % ROTATIONS.length],
          widthClass: WIDTH_CLASSES[idx % WIDTH_CLASSES.length],
          tapePosition: TAPE_POSITIONS[idx % TAPE_POSITIONS.length],
          displayUrl: resolveMediaUrl(item.url, item.media_type),
        }));

        if (isMounted) {
          setItems(formatted);
          setLoading(false);
        }
      } catch (err) {
        console.warn('Backend API fetch error, falling back to local scrapbook cache:', err);
        if (isMounted) {
          const fallbackFormatted: ScrapbookItem[] = FALLBACK_MEMORIES.map((item, idx) => ({
            ...item,
            rotation: ROTATIONS[idx % ROTATIONS.length],
            widthClass: WIDTH_CLASSES[idx % WIDTH_CLASSES.length],
            tapePosition: TAPE_POSITIONS[idx % TAPE_POSITIONS.length],
            displayUrl: resolveMediaUrl(item.url, item.media_type),
          }));
          setItems(fallbackFormatted);
          setLoading(false);
        }
      }
    }

    loadMedia();
    return () => {
      isMounted = false;
    };
  }, [refreshTrigger]);

  return (
    <div className="relative bg-[#f7f3ee] text-[#2b2622] min-h-screen overflow-x-hidden selection:bg-[#8c3a3a]/20">
      {/* Organic Warm Background Texture */}
      <div className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 opacity-20">
        <picture>
          <source media="(max-width: 768px)" srcSet={bodyMobileBgUrl} />
          <img src={bodyBgUrl} alt="Artistic Scrapbook Background" className="w-full h-full object-cover" />
        </picture>
      </div>

      <div className="relative z-10 pt-28 pb-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8c3a3a]/10 text-[#8c3a3a] text-xs font-semibold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>our little scrapbook ♡</span>
          </div>

          <h1 className="hero-title font-medium text-5xl sm:text-6xl md:text-7xl text-[#2b2622] tracking-tight mb-3">
            Memories & Stories
          </h1>

          <p className="font-['Caveat'] text-[#2b2622]/80 text-2xl sm:text-3xl leading-snug">
            photos, video clips, and scribbled thoughts from our past circles.
          </p>

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setRefreshTrigger((prev) => prev + 1)}
              title="Refresh Media from Supabase"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 hover:bg-white text-xs text-[#2b2622]/60 hover:text-[#2b2622] border border-[#2b2622]/10 transition cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Sync live</span>
            </button>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="flex flex-wrap items-start justify-center gap-8 sm:gap-10">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-full sm:w-80 bg-white p-4 rounded-md shadow-lg animate-pulse">
                <div className="w-full aspect-[4/5] bg-stone-200 rounded-xs mb-3" />
                <div className="h-4 bg-stone-200 rounded-sm w-3/4 mb-2" />
                <div className="h-4 bg-stone-200 rounded-sm w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Artsy Scattered Scrapbook Collage Wall */}
        {!loading && (
          <div className="flex flex-wrap items-start justify-center gap-8 sm:gap-10 md:gap-12">
            {items.map((item, index) => {
              const isVideo = item.media_type === 'video';
              const isDriveEmbed = item.displayUrl.includes('drive.google.com/file');

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 2 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  whileHover={{ scale: 1.04, rotate: 0, zIndex: 30 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setActiveItem(item)}
                  className={`relative group shrink-0 transition-all cursor-pointer ${item.rotation} ${item.widthClass}`}
                >
                  {/* Washi Paper Tape Accents */}
                  {item.tapePosition === 'top' && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-100/80 border-x border-[#2b2622]/20 shadow-xs rotate-[-2deg] z-20 pointer-events-none rounded-xs backdrop-blur-xs" />
                  )}
                  {item.tapePosition === 'top-right' && (
                    <div className="absolute -top-3 -right-3 w-16 h-6 bg-amber-100/80 border-x border-[#2b2622]/20 shadow-xs rotate-[28deg] z-20 pointer-events-none rounded-xs backdrop-blur-xs" />
                  )}
                  {item.tapePosition === 'top-left' && (
                    <div className="absolute -top-3 -left-3 w-16 h-6 bg-amber-100/80 border-x border-[#2b2622]/20 shadow-xs rotate-[-28deg] z-20 pointer-events-none rounded-xs backdrop-blur-xs" />
                  )}

                  {/* Polaroid Frame Card */}
                  <div className="bg-[#ffffff] p-3.5 pb-5 rounded-md shadow-xl border border-[#2b2622]/10 transition-shadow duration-300 group-hover:shadow-2xl">
                    {/* Media Container */}
                    <div className="relative w-full aspect-[4/5] bg-[#dfd3c3] overflow-hidden rounded-xs mb-3 shadow-inner">
                      {isVideo ? (
                        isDriveEmbed ? (
                          <iframe
                            src={item.displayUrl}
                            title={item.title}
                            className="w-full h-full border-0 pointer-events-none"
                            loading="lazy"
                          />
                        ) : (
                          <video
                            src={item.displayUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        )
                      ) : (
                        <img
                          src={item.displayUrl}
                          alt={item.title}
                          className="w-full h-full object-cover grayscale contrast-115 group-hover:grayscale-0 transition-all duration-700"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Handwritten Polaroid Caption */}
                    <div className="px-1 pt-1">
                      <h3 className="text-xs uppercase tracking-wider text-[#2b2622]/60 font-semibold mb-0.5 line-clamp-1">
                        {{ item: item.title }.item}
                      </h3>
                      <p className="font-['Caveat'] text-[#8c3a3a] text-2xl font-bold leading-tight">
                        {item.description || 'moments together ♡'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-3 right-3 z-20 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Media preview */}
                <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                  {activeItem.media_type === 'video' ? (
                    <video
                      src={activeItem.displayUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={activeItem.displayUrl}
                      alt={activeItem.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#8c3a3a]">
                      Memory Detail
                    </span>
                    <a
                      href={activeItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#2b2622]/60 hover:text-[#2b2622]"
                    >
                      <span>Open Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <h2 className="text-2xl font-semibold text-[#2b2622] mb-1">{activeItem.title}</h2>
                  <p className="font-['Caveat'] text-[#8c3a3a] text-2xl font-bold">
                    {activeItem.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Media;
