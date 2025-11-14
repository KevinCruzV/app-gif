"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getGiphyBySearch, getGiphyRandom } from "@/lib/giphyClient";
import type { GiphyGif } from "@/types/giphy";
import GifCard from "@/components/GifCard";
import SearchBar from "@/components/SearchBar";
import { SEARCH_MIN, RANDOM_ROTATE_MS } from "../lib/constants";

export default function Home() {
  // --- search states ---
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GiphyGif[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // --- random GIF states ---
  const [randomGif, setRandomGif] = useState<GiphyGif | null>(null);
  const [randomError, setRandomError] = useState<string | null>(null);
  const [isRandomLoading, setIsRandomLoading] = useState(false);

  // timers
  const searchTimeoutRef = useRef<number | undefined>(undefined);
  const rotateIntervalRef = useRef<number | undefined>(undefined);

  const hasActiveSearch = query.trim().length >= SEARCH_MIN;
  const showRandomSection = !hasActiveSearch && results.length === 0;

  // load one random GIF
  const loadRandom = async () => {
    try {
      setIsRandomLoading(true);
      const gif = await getGiphyRandom("g");
      setRandomGif(gif);
      setRandomError(null);
    } catch (err) {
      console.error(err);
      setRandomError("Could not load random GIF.");
    } finally {
      setIsRandomLoading(false);
    }
  };

  // init random GIF
  useEffect(() => {
    loadRandom();
  }, []);

  // rotate random GIF every 10s when no search/results
  useEffect(() => {
    if (showRandomSection) {
      rotateIntervalRef.current = window.setInterval(() => {
        loadRandom();
      }, RANDOM_ROTATE_MS);
    }

    // cleanup when condition change
    return () => {
      if (rotateIntervalRef.current !== undefined) {
        window.clearInterval(rotateIntervalRef.current);
        rotateIntervalRef.current = undefined;
      }
    };
  }, [showRandomSection]);

  // live search avec debounce
  useEffect(() => {
    // clear last timeout if rewrite
    if (searchTimeoutRef.current !== undefined) {
      window.clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = undefined;
    }

    const trimmed = query.trim();

    // less than 2 character -> reset
    if (trimmed.length < SEARCH_MIN) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    searchTimeoutRef.current = window.setTimeout(async () => {
      try {
        const gifs = await getGiphyBySearch(trimmed, 24, "g");
        setResults(gifs);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300) as unknown as number;

    return () => {
      if (searchTimeoutRef.current !== undefined) {
        window.clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = undefined;
      }
    };
  }, [query]);

  const handleCancelSearch = () => {
    setQuery("");
    setResults([]);
    setIsSearching(false);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-4 px-4 py-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Giphy Browser</h1>
        <p className="text-sm text-gray-500">
          Random GIFs and live search using the Giphy API.
        </p>
      </header>

      <SearchBar
        value={query}
        onChange={setQuery}
        onCancel={handleCancelSearch}
        isLoading={isSearching}
      />

      {/* Random GIF section (only when not searching / no results) */}
      {showRandomSection && (
        <section className="mt-4">
          <h2 className="mb-2 text-sm font-medium text-gray-400">Random GIF</h2>

          {randomError && (
            <p className="mb-2 text-sm text-red-500" role="alert">
              {randomError}
            </p>
          )}

          {isRandomLoading && !randomGif && (
            <p className="text-sm text-gray-500" role="status">
              Loading random GIF…
            </p>
          )}

          {randomGif && (
            <div className="max-w-md">
              <GifCard gif={randomGif} mode="animated" />
            </div>
          )}

          <p className="mt-2 text-xs text-gray-400">
            A new random GIF appears every 10 seconds when search is inactive.
          </p>
        </section>
      )}

      {/* Search results section */}
      {!showRandomSection && (
        <section className="mt-4">
          <h2 className="mb-2 text-sm font-medium text-gray-600">
            Search results {results.length > 0 && `(${results.length})`}
          </h2>

          {results.length === 0 && !isSearching && (
            <p className="text-sm text-gray-500">No GIFs found.</p>
          )}

          {results.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {results.map((gif) => (
                <Link key={gif.id} href={`/gif/${gif.id}`} className="block">
                  <GifCard gif={gif} mode="still" />
                </Link>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
