import { normaliseRating } from '@/lib/giphy';

interface RatingBadgeProps {
  rating: string | null | undefined;
}

export default function RatingBadge({ rating }: RatingBadgeProps) {
  return <span className="rating-badge">{normaliseRating(rating)}</span>;
}
