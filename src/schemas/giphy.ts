import { z } from "zod";
// To normalize API response
export const GiphyImgSchema = z.object({
  url: z.url(),
  width: z.string(),
  height: z.string(),
});

export const GiphyImgsSchema = z.object({
  original: GiphyImgSchema.optional(),
  fixed_width: GiphyImgSchema.optional(),
  fixed_width_small_still: GiphyImgSchema.optional(),
  preview_gif: GiphyImgSchema.optional(),
});

export const GiphyGifSchema = z.object({
  id: z.string(),
  title: z.string().default(""),
  url: z.url(),
  rating: z.string().default("g"),
  images: GiphyImgsSchema,
});

export const GiphySearchResponseSchema = z.object({
  data: z.array(z.unknown()),
});

export const GiphyByIdResponseSchema = z.object({
  data: GiphyGifSchema,
});

export const GiphyRandomResponseSchema = z.object({
  data: GiphyGifSchema,
});
