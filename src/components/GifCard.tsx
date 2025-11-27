"use client";

import { pickImage } from "@/lib/utils";
import { gifCardProps } from "@/types/gifCardProps";
import clsx from "clsx";
import Image from "next/image";
import RatingBadge from "./RatingBadge";

export default function GifCard({
  gif,
  mode = "animated",
  showLink = false,
  className = "",
}: gifCardProps) {
  const img = pickImage(gif, mode);
  if (!img) return null;

  return (
    <article
      className={clsx(
        "flex flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-md transition hover:shadow-lg",
        className,
      )}
    >
      <div className="relative w-full">
        <Image
          src={img.url}
          alt={gif.title}
          width={img.width}
          height={img.height}
          className="rounded-xl object-cover"
        />
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 flex-col">
          <h2 className="truncate text-sm font-medium text-gray-700">
            {gif.title || "Untitled"}
          </h2>
          {showLink && (
            <a
              href={gif.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-xs text-blue-600 underline"
            >
              {gif.url}
            </a>
          )}
        </div>
        <RatingBadge rating={gif.rating} />
      </div>
    </article>
  );
}
