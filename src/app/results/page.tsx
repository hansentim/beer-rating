'use client';

import React, { useEffect, useState } from 'react';
import { fetchRatings } from '@/utils/ratings';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';
import { ResultTabs } from '@/components/result-tabs';
import { SkeletonResultCard } from '@/components/skeleton-result-card';
import dynamic from 'next/dynamic';
import Logo from '@/components/logo';

const TopRankAnimation = dynamic(
  () => import('@/components/celebrate-animation'),
  {
    ssr: false,
  }
);

export default function ResultsPage() {
  const [results, setResults] = useState<
    {
      beerId: number;
      totalScore: number;
      tasteScore: number;
      christmasScore: number;
      userTotal: number;
      userTaste: number;
      userChristmas: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);
  const router = useRouter();
  const { userName } = useUser();

  useEffect(() => {
    const getResults = async () => {
      const data = await fetchRatings();

      const groupedRatings = data.reduce(
        (
          acc: Record<
            number,
            {
              taste: number[];
              feel: number[];
              userTaste: number | null;
              userFeel: number | null;
            }
          >,
          { beer_id, taste, feel, user_name }
        ) => {
          if (!acc[beer_id])
            acc[beer_id] = {
              taste: [],
              feel: [],
              userTaste: null,
              userFeel: null,
            };
          acc[beer_id].taste.push(taste);
          acc[beer_id].feel.push(feel);

          if (user_name === userName) {
            acc[beer_id].userTaste = taste;
            acc[beer_id].userFeel = feel;
          }
          return acc;
        },
        {}
      );

      const processedResults = Object.entries(groupedRatings).map(
        ([beerId, { taste, feel, userTaste, userFeel }]) => ({
          beerId: Number(beerId),
          totalScore:
            taste.reduce((sum, value) => sum + value, 0) +
            feel.reduce((sum, value) => sum + value, 0),
          tasteScore: taste.reduce((sum, value) => sum + value, 0),
          christmasScore: feel.reduce((sum, value) => sum + value, 0),
          userTotal: (userTaste || 0) + (userFeel || 0),
          userTaste: userTaste || 0,
          userChristmas: userFeel || 0,
        })
      );

      const sortedResults = processedResults.sort(
        (a, b) => b.totalScore - a.totalScore
      );
      setResults(sortedResults);

      // Trigger animation if top rank exists
      if (sortedResults[0]?.beerId) {
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 3500);
      }

      setLoading(false);
    };

    getResults();
  }, [userName]);

  if (loading) {
    return (
      <main className='p-4'>
        <h1 className='text-2xl font-bold text-center mt-4 mb-6'>
          Results, tasting menu
        </h1>
        <ul className='space-y-4'>
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonResultCard key={index} />
          ))}
        </ul>
      </main>
    );
  }

  return (
    <>
      <Logo />
      <main className='p-4 relative'>
        {/* Full-Screen Animation Overlay */}
        {showAnimation && (
          <div
            className={`absolute inset-0 z-50 flex items-center justify-center ${
              showAnimation ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            <TopRankAnimation />
          </div>
        )}

        <h1 className='text-4xl text-left font-bold mt-8'>
          And, the
          <span className='text-customGreen'> winner</span> is...
        </h1>
        <p className='text-left text-base text-custuomSubTitle mb-6'>
          Use the filters to view the results based on each rating type.{' '}
        </p>

        <div className='text-center mb-6'>
          <Button
            onClick={() => router.push('/menu')}
            variant='outline'
            className='h-16 w-full font-bold'
          >
            Back to tasting menu
          </Button>
        </div>
        <ResultTabs results={results} />
      </main>
    </>
  );
}
