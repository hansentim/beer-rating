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
  const beer = beers.find((beer) => beer.id === beerId);

  return (
    <Card
      className={`relative rounded h-28 mb-2 ${
        rank === 1 ? 'bg-customGreen text-white' : 'bg-yellow-100 text-gray-800'
      }`}
    >
      <CardContent className='flex items-center space-x-4'>
        {/* Rank Circle */}
        <div
          className={`w-10 h-10 flex-shrink-0 rounded-full flex justify-center items-center font-bold border-2 ${
            rank === 1 ? 'border-white text-white' : 'border-black text-black'
          }`}
        >
          {rank}
        </div>

        {/* Beer Image */}
        <div className='w-20 h-20 flex-shrink-0 relative mt-2'>
          <Image
            src={beer?.imageUrl || ''}
            alt={beer?.name || 'Beer'}
            fill
            className=' object-contain'
          />
        </div>

        {/* Beer Details */}
        <div className='flex flex-col space-y-1'>
          <CardHeader className='p-0'>
            <CardTitle className='text-lg md:text-xl font-bold truncate'>
              {beer?.name}
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
