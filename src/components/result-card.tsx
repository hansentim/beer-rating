import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { beers } from '@/data/beers';
import { ResultCardProps } from '@/types';
import { Badge } from '@/components/ui/badge';

export const ResultCard: React.FC<ResultCardProps> = ({
  rank,
  beerId,
  score,
  userScore,
}) => {
  const beer = beers.find((beer) => beer.id === beerId)!;

  const truncatedName =
    beer?.name.length > 20 ? `${beer.name.slice(0, 19)}...` : beer?.name;

  return (
    <Card
      className={`relative rounded h-32 mb-2 ${
        rank === 1 ? 'bg-customGreen text-white z-20' : 'bg-white text-gray-800'
      }`}
    >
      <CardContent className='flex items-center space-x-4 h-full'>
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
        <div className='flex flex-col justify-center space-y-2 w-full'>
          <CardHeader className='p-0'>
            <CardTitle className='text-base md:text-base font-bold truncate'>
              {truncatedName}
            </CardTitle>
          </CardHeader>
          <div className='flex space-x-2 mt-1'>
            {/* Total Score Badge */}
            <Badge className='bg-customBadgePink text-black px-3 py-1 text-sm font-bold rounded-full shadow-none'>
              {score} p
            </Badge>
            {/* User Score Badge */}
            <Badge className='bg-customBadgeGreen2 text-black px-3 py-1 text-sm font-bold rounded-full flex items-center space-x-1 shadow-none'>
              <span role='img' aria-label='detective'>
                🕵️
              </span>
              <span>{userScore}p</span>
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
