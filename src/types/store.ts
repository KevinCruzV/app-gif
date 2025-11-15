import { GiphyGif } from "./giphy";

export interface SearchState {
  query: string;
  results: GiphyGif[];
  isSearching: boolean;
}

export interface SearchActions {
  setQuery: (q: string) => void;
  setResults: (results: GiphyGif[]) => void;
  setIsSearching: (value: boolean) => void;
  reset: () => void;
}
