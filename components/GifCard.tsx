import Image from 'next/image';
import Link, { type LinkProps } from 'next/link';
import RatingBadge from './RatingBadge';
import type { Gif } from '@/lib/giphy';

interface GifCardProps {
  gif: Gif;
  href: LinkProps['href'];
}

export default function GifCard({ gif, href }: GifCardProps) {
  return (
    <Link href={href} className="card" prefetch>
      <div>
        {gif.preview.url ? (
          <Image
            src={gif.preview.url}
            alt={gif.title}
            width={gif.preview.width}
            height={gif.preview.height}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        ) : (
          <div style={{ paddingTop: '56%', background: '#222', borderRadius: '8px' }} />
        )}
      </div>
      <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <strong style={{ fontSize: '0.9rem' }}>{gif.title}</strong>
        <RatingBadge rating={gif.rating} />
      </div>
    </Link>
  );
}
