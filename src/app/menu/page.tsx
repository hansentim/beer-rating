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
    console.log('Navigating to /rating...');

    router.push('/rating');
  };

  return (
    <main className='p-4'>
      <h1 className='text-2xl font-bold text-center mb-4'>
        <span className='text-customGreen'>{userName},</span> tasting menu
      </h1>
      <div className='flex justify-center mb-6'>
        <div className='w-full max-w-sm'>
          <Button
            onClick={handleStartTasting}
            className='px-4 py-2 bg-customGreen hover:bg-customHoverGreen text-white rounded w-full'
          >
            Ready to Start Tasting
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {beers.map((beer) => (
          <BeerCard key={beer.id} beer={beer} />
        ))}
      </div>
    </main>
  );
}
