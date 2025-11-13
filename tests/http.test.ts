// tests/http.test.ts
import { it, expect, vi } from "vitest";
import { http, HttpError } from "@/lib/http";

global.fetch = vi.fn();

it("appends api_key and returns JSON", async () => {
  (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ data: "ok" }),
  });

  const res = await http<{ data: string }>("/search?q=cats");

  expect(res).toEqual({ data: "ok" });
  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining("api_key="),
    expect.any(Object),
  );
});

it("throws HttpError on non-ok", async () => {
  (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
    ok: false,
    status: 500,
    statusText: "Internal Error",
  });

  await expect(http("/random")).rejects.toBeInstanceOf(HttpError);
});
