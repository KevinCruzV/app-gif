import { SearchBarProps } from "@/types/searchBarProps";
import clsx from "clsx";
import { X, Loader2 } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  onCancel,
  isLoading = false,
  placeholder = "Search…",
  className,
}: SearchBarProps) {
  return (
    <div className={clsx("flex w-full items-center gap-2", className)}>
      <div className="relative flex-1">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Search GIFs"
          className="w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {value && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => onChange("")}
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md border border-gray-200 px-2 py-0.5 text-sm hover:bg-gray-50"
            title="Clear"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {isLoading && (
          <div
            aria-label="Searching…"
            className="absolute top-1/2 right-10 -translate-y-1/2"
          >
            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
          </div>
        )}
      </div>

      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          aria-label="Cancel search"
          className="rounded-xl border border-gray-200 px-3 py-2 hover:bg-gray-50"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
