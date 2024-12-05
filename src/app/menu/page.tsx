'use client';

import React from 'react';
import { useUser } from '@/context/userContext';
import { BeerCard } from '@/components/menu-beercard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { beers } from '@/data/beers';

export default function MenuPage() {
  const { userName } = useUser();
  const router = useRouter();

  const handleStartTasting = () => {
    router.push('/rating');
  };

  const handleGoToResults = () => {
    router.push('/results');
  };

  return (
    <main className='p-4'>
      <div className='w-full max-w-sm mx-auto mb-6'>
        <h1 className='text-4xl font-bold text-left mb-6'>
          <span className='text-customGreen'>{userName},</span> tasting menu 🍻
        </h1>
        <Button
          onClick={handleStartTasting}
          className='px-4 mb-4 py-2 text-base bg-customGreen hover:bg-customHoverGreen text-white rounded w-full h-16 font-bold'
        >
          Ready to Start Tasting
        </Button>
        <Button
          onClick={handleGoToResults}
          variant='outline'
          className='px-4 py-2 text-base w-full h-16 font-bold hover:border-spacing-2 hover:border-black'
        >
          Results
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {beers.map((beer) => (
          <BeerCard key={beer.id} beer={beer} />
        ))}
      </div>
    </main>
  );
}
