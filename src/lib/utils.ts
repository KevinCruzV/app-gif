import type { GiphyGif, PickImage } from "@/types/giphy";

// Helper to be able to pick adapted image depending on if it's a full screen or a list
// Still mode -> non animed image (for list)
// Animated mode -> animed image (for full screen)
export function pickImage(
  gif: GiphyGif,
  mode: "animated" | "still" = "animated",
): PickImage | null {
  const { images } = gif;

  // Non anime version
  if (mode === "still") {
    const img =
      images.fixed_width_small_still ?? images.fixed_width ?? images.original;
    if (!img) return null;
    return {
      url: img.url,
      width: Number(img.width),
      height: Number(img.height),
    };
  }

  // anime version
  const animated = images.preview_gif ?? images.fixed_width ?? images.original;
  if (!animated) return null;

  return {
    url: animated.url,
    width: Number(animated.width),
    height: Number(animated.height),
  };
}
