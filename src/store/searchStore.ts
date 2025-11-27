import { create } from "zustand";
import type { SearchState, SearchActions } from "@/types/store";

const initState: SearchState = {
  query: "",
  results: [],
  isSearching: false,
};

export const useSearchStore = create<SearchState & SearchActions>((set) => ({
  ...initState,
  setQuery: (query) => set({ query }),
  setResults: (results) => set({ results }),
  setIsSearching: (isSearching) => set({ isSearching }),
  reset: () => set(initState),
}));
