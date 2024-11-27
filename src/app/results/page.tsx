'use client';

import React, { useEffect, useState } from 'react';

interface BeerResult {
  beerId: number;
  averageRating: number;
  totalRatings: number;
}

interface UserRating {
  beerId: number;
  rating: number;
  userName: string;
}

const beers = [
  { id: 1, name: 'Lusse Lelle' },
  { id: 2, name: 'Stigbergets Juleljus NEIPA' },
  { id: 3, name: 'Poppels Bryggeri Glögg Sour 2024' },
  { id: 4, name: 'Benchwarmers Brewing Julbordsöl' },
  { id: 5, name: 'Coppersmith´s Julöl' },
  { id: 6, name: 'Train Station Brewery Jul IPA Alkoholfri, Glutenfri' },
];

export default function ResultsPage() {
  const [results, setResults] = useState<BeerResult[]>([]);
  const [highestRatedBeerId, setHighestRatedBeerId] = useState<number | null>(
    null
  );
  const [userRatings, setUserRatings] = useState<UserRating[]>([]);

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem('ratings') || '[]');

    // Group ratings by beerId
    const groupedRatings: Record<number, number[]> = {};
    savedRatings.forEach(
      ({ beerId, rating }: { beerId: number; rating: number }) => {
        if (!groupedRatings[beerId]) {
          groupedRatings[beerId] = [];
        }
        groupedRatings[beerId].push(rating);
      }
    );

    // Calculate average ratings
    const beerResults = Object.entries(groupedRatings).map(
      ([beerId, ratings]) => {
        const totalRatings = (ratings as number[]).length;
        const averageRating =
          (ratings as number[]).reduce((sum, r) => sum + r, 0) / totalRatings;

        return {
          beerId: Number(beerId),
          averageRating,
          totalRatings,
        };
      }
    );

    // Find the beer with the highest average rating
    const highestRated = beerResults.reduce(
      (max, beer) => (beer.averageRating > max.averageRating ? beer : max),
      { beerId: -1, averageRating: 0, totalRatings: 0 }
    );

    setResults(beerResults.sort((a, b) => b.averageRating - a.averageRating));
    setHighestRatedBeerId(highestRated.beerId);
    setUserRatings(savedRatings); // Save all user ratings
  }, []);

  return (
    <main className='p-4'>
      <h1 className='text-2xl font-bold text-center mb-6'>
        Beer Ratings Results
      </h1>
      {results.length === 0 ? (
        <p className='text-center'>No ratings submitted yet.</p>
      ) : (
        <ul className='space-y-4'>
          {results.map((result) => (
            <li
              key={result.beerId}
              className={`p-4 rounded shadow ${
                result.beerId === highestRatedBeerId
                  ? 'bg-yellow-200 border-2 border-yellow-500'
                  : 'bg-gray-100'
              }`}
            >
              <p className='text-lg font-bold'>
                {beers.find((beer) => beer.id === result.beerId)?.name}{' '}
                {result.beerId === highestRatedBeerId && ' (Winner!)'}
              </p>
              <p>Average Rating: {result.averageRating.toFixed(2)}</p>
              <p>Total Ratings: {result.totalRatings}</p>
            </li>
          ))}
        </ul>
      )}

      {/* User Ratings */}
      <h2 className='text-lg font-bold mt-8'>User Ratings</h2>
      <ul className='mt-4 space-y-2'>
        {userRatings.map((rating, index) => (
          <li key={index} className='p-2 bg-gray-100 rounded shadow'>
            <p>
              <strong>{rating.userName}</strong> rated{' '}
              <strong>
                {beers.find((beer) => beer.id === rating.beerId)?.name}
              </strong>{' '}
              {rating.rating} stars
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
