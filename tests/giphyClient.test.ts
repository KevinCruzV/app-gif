import { describe, it, expect, vi, beforeEach } from "vitest";
import * as httpLib from "@/lib/http";
import {
  getGiphyBySearch,
  getGiphyById,
  getGiphyRandom,
} from "@/lib/giphyClient";

// mock http
vi.mock("@/lib/http");

const baseGif = {
  id: "1",
  title: "Dog",
  url: "https://giphy.com/gifs/123",
  rating: "g",
  images: {
    original: {
      url: "https://media.giphy.com/original.gif",
      width: "480",
      height: "270",
    },
  },
};

beforeEach(() => vi.resetAllMocks());

describe("getGiphyBySearch", () => {
  it("returns only valid GIFs and ignores invalid ones", async () => {
    vi.mocked(httpLib.http).mockResolvedValueOnce({
      data: [baseGif, { ...baseGif, id: "2" }, { ...baseGif, id: undefined }],
    });

    const res = await getGiphyBySearch("memes");
    expect(res.map((g) => g.id)).toEqual(["1", "2"]);
  });
});

describe("getGiphyById", () => {
  it("returns parsed gif", async () => {
    vi.mocked(httpLib.http).mockResolvedValueOnce({ data: baseGif });
    const res = await getGiphyById("1");
    expect(res.id).toBe("1");
  });
});

describe("getGiphyRandom", () => {
  it("returns parsed gif", async () => {
    vi.mocked(httpLib.http).mockResolvedValueOnce({ data: baseGif });
    const res = await getGiphyRandom("g");
    expect(res.url).toBe("https://giphy.com/gifs/123");
  });
});
