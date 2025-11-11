import { NextResponse } from 'next/server';
import { mapGif, type Gif, type GiphyRandomResponse } from '@/lib/giphy';

function getApiKey(): string {
  const key = process.env.GIPHY_API_KEY;
  if (!key) {
    throw new Error('Missing GIPHY_API_KEY environment variable.');
  }

  return key;
}

export async function GET() {
  try {
    const apiKey = getApiKey();
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&rating=pg-13`,
      {
        next: { revalidate: 0 }
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to load a random GIF.' },
        { status: response.status }
      );
    }

    const payload = (await response.json()) as GiphyRandomResponse;
    const gif: Gif = mapGif(payload.data);

    return NextResponse.json(gif);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Unexpected error.' },
      { status: 500 }
    );
  }
}
