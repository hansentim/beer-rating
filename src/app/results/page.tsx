'use client';

import React, { useEffect, useState } from 'react';
import { fetchRatings } from '@/utils/ratings';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

const beers = [
  { id: 1, name: 'Lusse Lelle', imageUrl: '/images/lelle.webp' },
  {
    id: 2,
    name: 'Stigbergets Juleljus NEIPA',
    imageUrl: '/images/stigberg.webp',
  },
  {
    id: 3,
    name: 'Poppels Bryggeri Glögg Sour 2024',
    imageUrl: '/images/poppel.webp',
  },
  {
    id: 4,
    name: 'Benchwarmers Brewing Julbordsöl',
    imageUrl: '/images/honey.webp',
  },
  { id: 5, name: 'Coppersmith´s Julöl', imageUrl: '/images/copper.webp' },
  {
    id: 6,
    name: 'Train Station Brewery Jul IPA Alkoholfri, Glutenfri',
    imageUrl: '/images/train.webp',
  },
];

export default function ResultsPage() {
  const [results, setResults] = useState<
    {
      beerId: number;
      totalScore: number;
      userScore: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { userName } = useUser();

  useEffect(() => {
    const getResults = async () => {
      const data = await fetchRatings();

      const groupedRatings = data.reduce(
        (
          acc: Record<
            number,
            { taste: number[]; feel: number[]; userScore: number | null }
          >,
          { beer_id, taste, feel, user_name }
        ) => {
          if (!acc[beer_id])
            acc[beer_id] = { taste: [], feel: [], userScore: null };
          acc[beer_id].taste.push(taste);
          acc[beer_id].feel.push(feel);

          if (user_name === userName) {
            acc[beer_id].userScore = taste + feel;
          }
          return acc;
        },
        {}
      );

      const processedResults = Object.entries(groupedRatings).map(
        ([beerId, { taste, feel, userScore }]) => ({
          beerId: Number(beerId),
          totalScore:
            taste.reduce((sum, value) => sum + value, 0) +
            feel.reduce((sum, value) => sum + value, 0),
          userScore: userScore || 0,
        })
      );

      setResults(processedResults.sort((a, b) => b.totalScore - a.totalScore));
      setLoading(false);
    };

    getResults();
  }, [userName]);

  if (loading) {
    return (
      <main className='p-4'>
        <h1 className='text-2xl font-bold text-center mb-6'>
          Results, tasting menu
        </h1>
        <ul className='space-y-4'>
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className='p-4 bg-gray-100 rounded shadow'>
              <div className='flex items-center space-x-4'>
                <Skeleton className='w-16 h-16 rounded-full' />
                <div className='flex-1 space-y-2'>
                  <Skeleton className='h-4 w-1/2' />
                  <Skeleton className='h-4 w-1/3' />
                  <Skeleton className='h-4 w-1/4' />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    );
  }

  return (
    <main className='p-4'>
      <h1 className='text-2xl font-bold text-center mb-6'>
        <span className='text-customGreen'>Results</span>, tasting menu
      </h1>
      <div className='text-center mb-6'>
        <Button
          onClick={() => router.push('/menu')}
          className='px-4 py-2 bg-customGreen hover:bg-customHoverGreen text-white rounded w-full'
        >
          Back to menu
        </Button>
      </div>
      <ul className='space-y-4'>
        {results.map((result, index) => (
          <li key={result.beerId}>
            <Card
              className={`shadow ${
                index === 0 ? 'bg-customGreen' : 'bg-yellow-100'
              }`}
            >
              <CardContent className='flex items-center space-x-4'>
                <div className='flex-shrink-0'>
                  <div className='w-10 h-10 rounded-full bg-green-500 flex justify-center items-center text-white font-bold'>
                    {index + 1}
                  </div>
                </div>
                <div className='w-16 h-16 relative flex-shrink-0'>
                  <Image
                    src={
                      beers.find((beer) => beer.id === result.beerId)
                        ?.imageUrl || ''
                    }
                    alt={
                      beers.find((beer) => beer.id === result.beerId)?.name ||
                      ''
                    }
                    fill
                    className='object-contain rounded-full'
                  />
                </div>
                <div>
                  <CardHeader>
                    <CardTitle className='text-lg font-bold'>
                      {beers.find((beer) => beer.id === result.beerId)?.name}
                    </CardTitle>
                    <CardDescription className='text-sm text-gray-600'>
                      Total Score: {result.totalScore} points
                    </CardDescription>
                    <CardDescription className='text-sm text-gray-600'>
                      You: {result.userScore}
                    </CardDescription>
                  </CardHeader>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}
