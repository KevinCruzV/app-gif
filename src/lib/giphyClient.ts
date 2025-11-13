import { http } from "./http";
import type {
  GiphyGif,
  GiphySearchResponse,
  GiphyByIdResponse,
  GiphyRandomResponse,
} from "@/types/giphy";
import {
  GiphySearchResponseSchema,
  GiphyByIdResponseSchema,
  GiphyRandomResponseSchema,
  GiphyGifSchema,
} from "@/schemas/giphy";

// GET /search
export async function getGiphyBySearch(
  q: string,
  limit = 24,
  rating: string = "g",
): Promise<GiphyGif[]> {
  const qs = new URLSearchParams({ q, limit: String(limit), rating });
  const res = await http<GiphySearchResponse>(`/search?${qs.toString()}`);
  
  const envelope = GiphySearchResponseSchema.safeParse(res);
  if (!envelope.success) {
    throw new Error("Invalid /search payload");
  }

  const valid: GiphyGif[] = [];
  for (const item of envelope.data.data ?? []) {
    const parsed = GiphyGifSchema.safeParse(item);
    if (parsed.success) valid.push(parsed.data);
  }
  return valid;
}

// GET /:id
export async function getGiphyById(id: string): Promise<GiphyGif> {
  const res = await http<GiphyByIdResponse>(`/${id}`);
  const parsed = GiphyByIdResponseSchema.safeParse(res);
  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error("Invalid /:id payload");
  }
  return parsed.data.data;
}

// GET /random
export async function getGiphyRandom(rating: string = "g"): Promise<GiphyGif> {
  const res = await http<GiphyRandomResponse>(`/random?rating=${rating}`);
  const parsed = GiphyRandomResponseSchema.safeParse(res);
  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error("Invalid /random payload");
  }

  return parsed.data.data;
}
