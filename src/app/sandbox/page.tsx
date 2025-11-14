"use client";
import RatingBadge from "@/components/RatingBadge";
import GifCard from "@/components/GifCard";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

const mockGif = {
  id: "1",
  title: "Test GIF",
  url: "https://giphy.com/gifs/test",
  rating: "pg-13",
  images: {
    original: {
      url: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
      width: "480",
      height: "270",
    },
  },
};

export default function SandboxPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  return (
    <main className="grid min-h-screen place-items-center p-10">
      <SearchBar
        value={query}
        onChange={(v) => {
          setQuery(v);
          setIsSearching(true);

          setTimeout(() => {
            setIsSearching(false);
          }, 600);
        }}
        onCancel={() => setQuery("")}
        isLoading={isSearching}
      />

      <GifCard gif={mockGif} />
      <div className="flex gap-4">
        <RatingBadge rating="g" />
        <RatingBadge rating="pg" />
        <RatingBadge rating="pg-13" />
        <RatingBadge rating="r" />
      </div>
    </main>
  );
}
