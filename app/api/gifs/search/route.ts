import { NextRequest, NextResponse } from 'next/server';
import { mapGif, type Gif, type GiphySearchResponse, isEligibleQuery } from '@/lib/giphy';

function getApiKey(): string {
  const key = process.env.GIPHY_API_KEY;
  if (!key) {
    throw new Error('Missing GIPHY_API_KEY environment variable.');
  }

  return key;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') ?? '';

  if (!isEligibleQuery(query)) {
    return NextResponse.json<Gif[]>([]);
  }

  try {
    const apiKey = getApiKey();
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
        query
      )}&limit=24&rating=pg-13&lang=en&bundle=messaging_non_clips`
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to search for GIFs.' },
        { status: response.status }
      );
    }

    const payload = (await response.json()) as GiphySearchResponse;
    const gifs = payload.data.map(mapGif);
    return NextResponse.json(gifs);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Unexpected error.' },
      { status: 500 }
    );
  }
}
