import { describe, expect, it } from 'vitest';
import { isEligibleQuery, mapGif, normaliseRating, type GiphyApiGif } from './giphy';

const sampleGif: GiphyApiGif = {
  id: '123',
  title: 'Test GIF',
  rating: 'pg',
  url: 'https://giphy.com/gifs/123',
  images: {
    original: { url: 'https://media.giphy.com/media/123/giphy.gif', width: '480', height: '270' },
    fixed_width_small_still: {
      url: 'https://media.giphy.com/media/123/100w_s.gif',
      width: '100',
      height: '80'
    }
  }
};

describe('normaliseRating', () => {
  it('returns NR when rating is nullish', () => {
    expect(normaliseRating(null)).toBe('NR');
    expect(normaliseRating(undefined)).toBe('NR');
  });

  it('uppercases rating when provided', () => {
    expect(normaliseRating('pg-13')).toBe('PG-13');
  });
});

describe('isEligibleQuery', () => {
  it('requires at least two non-space characters', () => {
    expect(isEligibleQuery('')).toBe(false);
    expect(isEligibleQuery(' a')).toBe(false);
    expect(isEligibleQuery('ab')).toBe(true);
  });
});

describe('mapGif', () => {
  it('maps images to gif model', () => {
    const gif = mapGif(sampleGif);
    expect(gif.id).toBe('123');
    expect(gif.title).toBe('Test GIF');
    expect(gif.rating).toBe('pg');
    expect(gif.animated.url).toContain('giphy.gif');
    expect(gif.preview.url).toContain('100w_s.gif');
  });

  it('falls back to still image when preview missing', () => {
    const { fixed_width_small_still, ...rest } = sampleGif.images;
    const gif = mapGif({ ...sampleGif, images: { ...rest } });
    expect(gif.preview.url).toContain('giphy.gif');
  });
});
