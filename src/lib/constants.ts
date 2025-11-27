// API const
export const GIPHY_API_BASE = "https://api.giphy.com/v1/gifs";
export const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

// Gif const
export const SEARCH_MIN = 2;
export const RANDOM_ROTATE_MS =
  process.env.NODE_ENV === "development" ? 30000 : 10000;
