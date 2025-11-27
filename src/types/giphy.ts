// Img get by Giphy
export interface GiphyImg {
  url: string;
  width: string;
  height: string;
}

// Imgs format for a Giphy meme
export interface GiphyImgs {
  original?: GiphyImg;
  fixed_width?: GiphyImg;
  fixed_width_small_still?: GiphyImg;
  preview_gif?: GiphyImg;
}

// Gif for our app
export interface GiphyGif {
  id: string;
  url: string;
  rating: string;
  title: string;
  images: GiphyImgs;
}

export interface PickImage {
  url: string;
  width: number;
  height: number;
}

// Search response
export interface GiphySearchResponse {
  data: GiphyGif[];
}

// Gif by Id response
export interface GiphyByIdResponse {
  data: GiphyGif;
}

// Random Gif response
export interface GiphyRandomResponse {
  data: GiphyGif;
}
