import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { beers } from '@/data/beers';
import { ResultCardProps } from '@/types';

export const ResultCard: React.FC<ResultCardProps> = ({
  rank,
  beerId,
  score,
  userScore,
}) => {
  const beer = beers.find((beer) => beer.id === beerId)!;

  const truncatedName =
    beer?.name.length > 21 ? `${beer.name.slice(0, 20)}...` : beer?.name;

  return (
    <Card
      className={`relative rounded h-28 mb-2 ${
        rank === 1 ? 'bg-customGreen text-white' : 'bg-yellow-100 text-gray-800'
      }`}
    >
      <CardContent className='flex items-center space-x-4 h-full mt-2'>
        {/* Rank Circle */}
        <div
          className={`w-10 h-10 flex-shrink-0 rounded-full flex justify-center items-center font-bold border-2 ${
            rank === 1 ? 'border-white text-white' : 'border-black text-black'
          }`}
        >
          {rank}
        </div>

        {/* Beer Image */}
        <div className='w-16 h-16 flex-shrink-0 relative'>
          <Image
            src={beer?.imageUrl || ''}
            alt={beer?.name || 'Beer'}
            fill
            className='object-contain rounded'
          />
        </div>

        {/* Beer Details */}
        <div className='flex flex-col justify-center space-y-1'>
          <CardHeader className='p-0'>
            <CardTitle className='text-base md:text-base font-bold truncate'>
              {truncatedName}
            </CardTitle>
          </CardHeader>
          <p className='text-sm'>
            <span className='font-bold'>Score:</span> {score} points
          </p>
          <p className='text-sm'>
            <span className='font-bold'>You:</span> {userScore}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
