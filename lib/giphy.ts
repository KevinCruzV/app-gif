export interface GiphyImageVariant {
  url: string;
  width: number;
  height: number;
}

export interface Gif {
  id: string;
  title: string;
  rating: string | null;
  url: string;
  animated: GiphyImageVariant;
  preview: GiphyImageVariant;
}

export interface GiphyApiGif {
  id: string;
  title: string;
  rating?: string;
  url: string;
  images: Record<string, { url: string; width: string; height: string }>;
}

export interface GiphyRandomResponse {
  data: GiphyApiGif;
}

export interface GiphySearchResponse {
  data: GiphyApiGif[];
}

export interface GiphySingleResponse {
  data: GiphyApiGif;
}

const FALLBACK_SIZE = { width: 480, height: 270 };

function parseVariant(
  variant?: { url: string; width: string; height: string }
): GiphyImageVariant {
  if (!variant) {
    return {
      url: '',
      width: FALLBACK_SIZE.width,
      height: FALLBACK_SIZE.height
    };
  }

  return {
    url: variant.url,
    width: Number.parseInt(variant.width, 10) || FALLBACK_SIZE.width,
    height: Number.parseInt(variant.height, 10) || FALLBACK_SIZE.height
  };
}

export function mapGif(apiGif: GiphyApiGif): Gif {
  const original = parseVariant(apiGif.images.original);
  const preview = parseVariant(
    apiGif.images.fixed_width_small_still ?? apiGif.images.preview_gif ?? apiGif.images.original_still
  );

  return {
    id: apiGif.id,
    title: apiGif.title || 'Untitled GIF',
    rating: apiGif.rating ?? null,
    url: apiGif.url,
    animated: original,
    preview
  };
}

export const MIN_QUERY_LENGTH = 2;

export function isEligibleQuery(query: string): boolean {
  return query.trim().length >= MIN_QUERY_LENGTH;
}

export function normaliseRating(rating: string | null | undefined): string {
  if (!rating) {
    return 'NR';
  }

  const upper = rating.trim().toUpperCase();
  return upper.length > 0 ? upper : 'NR';
}
