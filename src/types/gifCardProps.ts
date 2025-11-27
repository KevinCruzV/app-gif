import { GiphyGif } from "@/types/giphy";

export interface gifCardProps {
  gif: GiphyGif;
  mode?: "animated" | "still";
  showLink: boolean;
  className?: string;
}
