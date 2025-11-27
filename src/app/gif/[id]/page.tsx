"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getGiphyById } from "@/lib/giphyClient";
import type { GiphyGif } from "@/types/giphy";
import GifCard from "@/components/GifCard";

export default function GifDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [gif, setGif] = useState<GiphyGif | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = params?.id;
    if (!id) return;

    let cancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getGiphyById(id);
        if (!cancelled) {
          setGif(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Could not load GIF.");
          setGif(null);
          console.error(err);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [params?.id]);

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-4 px-4 py-6">
      {/* Header */}
      <header className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        <h1 className="text-lg font-semibold text-gray-200">GIF details</h1>
      </header>

      {isLoading && (
        <p className="text-sm text-gray-500" aria-live="polite">
          Loading GIF…
        </p>
      )}

      {error && !isLoading && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {!isLoading && !error && gif && (
        <section className="mt-2">
          <GifCard gif={gif} mode="animated" className="w-full" showLink />
        </section>
      )}
    </main>
  );
}
