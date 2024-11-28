import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonResultCard() {
  return (
    <li className='p-4 bg-gray-100 rounded shadow space-y-2'>
      <Skeleton className='h-6 w-3/4 rounded' />
      <Skeleton className='h-4 w-1/2 rounded' />
      <Skeleton className='h-4 w-1/3 rounded' />
    </li>
  );
}
