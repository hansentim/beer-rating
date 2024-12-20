'use client';

import React, { useEffect, useState } from 'react';
import { fetchRatings } from '@/utils/ratings';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';
import { ResultTabs } from '@/components/result-tabs';
import { SkeletonResultCard } from '@/components/skeleton-result-card';
import { supabase } from '../../../supabase';
import dynamic from 'next/dynamic';

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
  const [currentTopRank, setCurrentTopRank] = useState<number | null>(null);
  const router = useRouter();
  const { userName } = useUser();

  const updateResults = async () => {
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

    const newTopRank = sortedResults[0]?.beerId || null;
    if (newTopRank !== currentTopRank) {
      setCurrentTopRank(newTopRank);
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 3500);
    }

    setResults(sortedResults);
    setLoading(false);
  };

  useEffect(() => {
    updateResults();

    // Set up a subscription to listen for changes in the `ratings` table
    const subscription = supabase
      .channel('realtime-ratings')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ratings' },
        () => {
          // Fetch updated results when a change is detected
          updateResults();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userName, currentTopRank]);

  if (loading) {
    return (
      <main className='p-4'>
        <h1 className='text-2xl font-bold text-center mb-6'>
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
    <main className='p-4 relative'>
      {/* Full-Screen Animation Overlay */}
      {showAnimation && <TopRankAnimation />}

      <h1 className='text-4xl text-left font-bold '>
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
  );
}
