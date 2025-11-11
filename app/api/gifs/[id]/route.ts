import { NextRequest, NextResponse } from 'next/server';
import { mapGif, type Gif, type GiphySingleResponse } from '@/lib/giphy';

function getApiKey(): string {
  const key = process.env.GIPHY_API_KEY;
  if (!key) {
    throw new Error('Missing GIPHY_API_KEY environment variable.');
  }

  return key;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const apiKey = getApiKey();
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/${params.id}?api_key=${apiKey}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to load the GIF.' },
        { status: response.status }
      );
    }

    const payload = (await response.json()) as GiphySingleResponse;
    const gif: Gif = mapGif(payload.data);
    return NextResponse.json(gif);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Unexpected error.' },
      { status: 500 }
    );
  }
}
