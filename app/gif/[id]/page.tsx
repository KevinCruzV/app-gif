import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import RatingBadge from '@/components/RatingBadge';
import { mapGif, type Gif, type GiphySingleResponse } from '@/lib/giphy';

async function fetchGif(id: string): Promise<Gif | null> {
  const apiKey = process.env.GIPHY_API_KEY;
  if (!apiKey) {
    return null;
  }

  const response = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${apiKey}`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as GiphySingleResponse;
  return mapGif(payload.data);
}

interface GifPageProps {
  params: { id: string };
  searchParams: { q?: string };
}

export default async function GifPage({ params, searchParams }: GifPageProps) {
  const gif = await fetchGif(params.id);

  if (!gif) {
    notFound();
  }

  const backHref = searchParams.q ? `/?q=${encodeURIComponent(searchParams.q)}` : '/';

  return (
    <div className="detail-layout">
      <div className="detail-header">
        <Link href={backHref}>&larr; Back</Link>
      </div>
      <div className="detail-content">
        {gif.animated.url && (
          <Image
            src={gif.animated.url}
            alt={gif.title}
            width={gif.animated.width}
            height={gif.animated.height}
            priority
          />
        )}
        <div className="detail-meta">
          <h2>{gif.title}</h2>
          <RatingBadge rating={gif.rating} />
          <a href={gif.url} target="_blank" rel="noreferrer">
            {gif.url}
          </a>
        </div>
      </div>
    </div>
  );
}
