"use client";

function letterToAge(rating?: string) {
  const r = (rating || "g").toLowerCase();
  switch (r) {
    case "y":
    case "g":
      return "G";
    case "pg":
      return "10+";
    case "pg-13":
      return "13+";
    case "r":
      return "16+";
    default:
      return r.toLowerCase();
  }
}

export default function RatingBadge({ rating }: { rating?: string }) {
  const label = letterToAge(rating);
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs text-gray-800"
      aria-label={`Age rating ${label}`}
    >
      {label}
    </span>
  );
}
