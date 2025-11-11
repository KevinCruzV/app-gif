'use client';

import { useCallback, useEffect, useMemo, useState, useTransition } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import GifCard from '@/components/GifCard';
import RatingBadge from '@/components/RatingBadge';
import type { Gif } from '@/lib/giphy';
import { isEligibleQuery } from '@/lib/giphy';

const RANDOM_REFRESH_INTERVAL = 10_000;

async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(initialQuery);
  const [randomGif, setRandomGif] = useState<Gif | null>(null);
  const [searchResults, setSearchResults] = useState<Gif[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const randomMode = !isEligibleQuery(query);

  const updateQueryParam = useCallback(
    (value: string) => {
      startTransition(() => {
        if (typeof window === 'undefined') {
          return;
        }
        const newParams = new URLSearchParams(window.location.search);
        if (value) {
          newParams.set('q', value);
        } else {
          newParams.delete('q');
        }
        const queryString = newParams.toString();
        router.replace(queryString ? `/?${queryString}` : '/', { scroll: false });
      });
    },
    [router]
  );

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const loadRandomGif = useCallback(async () => {
    try {
      const gif = await fetchJson<Gif>('/api/gifs/random', { cache: 'no-store' });
      setRandomGif(gif);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load GIF');
    }
  }, []);

  useEffect(() => {
    if (!randomMode) {
      return;
    }

    let isMounted = true;
    void loadRandomGif();

    const interval = setInterval(() => {
      if (isMounted) {
        void loadRandomGif();
      }
    }, RANDOM_REFRESH_INTERVAL);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [loadRandomGif, randomMode]);

  useEffect(() => {
    if (!isEligibleQuery(query)) {
      setSearchResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    let ignore = false;
    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await fetchJson<Gif[]>(
          `/api/gifs/search?q=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );
        if (!ignore) {
          setSearchResults(results);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          if (err instanceof Error && err.name === 'AbortError') {
            return;
          }
          setError(err instanceof Error ? err.message : 'Search failed');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }, 250);

    return () => {
      ignore = true;
      controller.abort();
      clearTimeout(timeout);
    };
  }, [query]);

  const handleChange = useCallback(
    (value: string) => {
      setQuery(value);
      updateQueryParam(value);
    },
    [updateQueryParam]
  );

  const handleCancel = useCallback(() => {
    setQuery('');
    setSearchResults([]);
    setError(null);
    updateQueryParam('');
    void loadRandomGif();
  }, [loadRandomGif, updateQueryParam]);

  const hasResults = searchResults.length > 0;

  const statusText = useMemo(() => {
    if (loading || isPending) {
      return 'Loading...';
    }

    if (error) {
      return error;
    }

    if (isEligibleQuery(query) && !hasResults) {
      return 'No GIFs found. Try a different search term!';
    }

    return null;
  }, [loading, isPending, error, query, hasResults]);

  return (
    <div>
      <header>
        <h1>GIF Explorer</h1>
      </header>
      <SearchBar value={query} onChange={handleChange} onCancel={handleCancel} />

      {randomMode ? (
        <section className="random-wrapper" style={{ marginTop: '2rem' }}>
          {randomGif ? (
            <>
              {randomGif.animated.url && (
                <Image
                  src={randomGif.animated.url}
                  alt={randomGif.title}
                  width={randomGif.animated.width}
                  height={randomGif.animated.height}
                  priority
                />
              )}
              <div className="meta">
                <h2>{randomGif.title}</h2>
                <RatingBadge rating={randomGif.rating} />
                <a href={randomGif.url} target="_blank" rel="noreferrer">
                  {randomGif.url}
                </a>
              </div>
            </>
          ) : (
            <p className="status-text">{error ?? 'Fetching a random GIF...'}</p>
          )}
        </section>
      ) : (
        <section style={{ marginTop: '2rem' }}>
          {hasResults ? (
            <div className="card-grid">
              {searchResults.map((gif) => (
                <GifCard
                  key={gif.id}
                  gif={gif}
                  href={{
                    pathname: `/gif/${gif.id}`,
                    query: query ? { q: query } : undefined
                  }}
                />
              ))}
            </div>
          ) : (
            statusText && <p className="status-text">{statusText}</p>
          )}
        </section>
      )}

      {!randomMode && statusText && hasResults && (
        <p className="status-text">{statusText}</p>
      )}
    </div>
  );
}
