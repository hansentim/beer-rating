'use client';

import React, { useEffect, useState } from 'react';
import { fetchRatings } from '@/utils/ratings';
import { UserRating, BeerResult } from '@/types';
import { SkeletonResultCard } from '@/components/skeleton-result-card';

const beers = [
  { id: 1, name: 'Lusse Lelle' },
  { id: 2, name: 'Stigbergets Juleljus NEIPA' },
  { id: 3, name: 'Poppels Bryggeri Glögg Sour 2024' },
  { id: 4, name: 'Benchwarmers Brewing Julbordsöl' },
  { id: 5, name: 'Coppersmith´s Julöl' },
  { id: 6, name: 'Train Station Brewery Jul IPA Alkoholfri, Glutenfri' },
];

export default function ResultsPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [results, setResults] = useState<BeerResult[]>([]);
  const [userRatings, setUserRatings] = useState<UserRating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    const getRatings = async () => {
      try {
        const data = await fetchRatings();
        console.log('Fetched ratings:', data);

        const groupedRatings: Record<number, number[]> = data.reduce(
          (acc: Record<number, number[]>, rating: UserRating) => {
            const { beer_id, rating: score } = rating;

            if (!acc[beer_id]) acc[beer_id] = [];
            acc[beer_id].push(score);

            return acc;
          },
          {}
        );

        const results = Object.entries(groupedRatings).map(
          ([beerId, scores]) => ({
            beerId: Number(beerId),
            averageRating:
              scores.reduce((sum, score) => sum + score, 0) / scores.length,
            totalRatings: scores.length,
          })
        );
        console.log('Processed results:', results);
        setResults(results.sort((a, b) => b.averageRating - a.averageRating));
        setUserRatings(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ratings:', error);
        setLoading(false);
      }
    };

    getRatings();
  }, [isHydrated]);

  if (!isHydrated) {
    return null;
  }

  return (
    <main className='p-4'>
      <h1 className='text-2xl font-bold text-center mb-6'>
        Beer Ratings Results
      </h1>
      {loading ? (
        <ul className='space-y-4'>
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonResultCard key={index} />
          ))}
        </ul>
      ) : results.length === 0 ? (
        <p className='text-center'>No ratings submitted yet.</p>
      ) : (
        <>
          <ul className='space-y-4'>
            {results.map((result, index) => (
              <li
                key={result.beerId}
                className={`p-4 rounded shadow ${
                  index === 0
                    ? 'bg-yellow-200 border-2 border-yellow-500'
                    : 'bg-gray-100'
                }`}
              >
                <p className='text-lg font-bold'>
                  {beers.find((beer) => beer.id === result.beerId)?.name}{' '}
                  {index === 0 && ' (Winner!)'}
                </p>
                <p>Average Rating: {result.averageRating.toFixed(2)}</p>
                <p>Total Ratings: {result.totalRatings}</p>
              </li>
            ))}
          </ul>
          <h2 className='text-lg font-bold mt-8'>User Ratings</h2>
          <ul className='mt-4 space-y-2'>
            {userRatings.map((rating, index) => (
              <li key={index} className='p-2 bg-gray-100 rounded shadow'>
                <p>
                  <strong>{rating.user_name}</strong> rated{' '}
                  <strong>
                    {beers.find((beer) => beer.id === rating.beer_id)?.name}
                  </strong>{' '}
                  {rating.rating} stars
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
