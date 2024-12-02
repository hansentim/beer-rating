'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { BeerCard } from '@/components/menu-beercard';
import { supabase } from '../../../supabase';
import { useUser } from '@/context/userContext';
import { beers } from '@/data/beers';

const ResultAnimation = dynamic(() => import('@/components/result-animation'), {
  ssr: false,
});

export default function BeerRatingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [tasteRating, setTasteRating] = useState<number | null>(null);
  const [feelRating, setFeelRating] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userName } = useUser();

  const currentBeer = beers[step];

  const handleRatingSubmit = async () => {
    if (tasteRating === null || feelRating === null) {
      return;
    }

    try {
      const { error } = await supabase.from('ratings').insert([
        {
          beer_id: currentBeer.id,
          taste: tasteRating,
          feel: feelRating,
          user_name: userName,
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      if (step + 1 < beers.length) {
        setTasteRating(null);
        setFeelRating(null);
        setStep(step + 1);
      } else {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 2500));
        router.push('/results');
      }
    } catch (e) {
      console.error('Error submitting rating:', e);
    }
  };

  if (isLoading) {
    return <ResultAnimation />;
  }

  return (
    <main className='p-4'>
      <h1 className='text-2xl font-bold text-center mb-4'>
        Beer {step + 1} 🍺
      </h1>
      <p className='text-center mb-6 text-gray-600'>
        Rate the taste and Christmas feel of this beer!
      </p>

      <BeerCard beer={currentBeer} />

      <div className='space-y-6 mt-6'>
        {/* Taste Section */}
        <div className='flex flex-col space-y-2'>
          <h3 className='text-lg font-bold'>Taste</h3>
          <div className='flex justify-between items-center p-2 border border-gray-200 rounded'>
            <ToggleGroup
              type='single'
              value={tasteRating !== null ? tasteRating.toString() : ''}
              onValueChange={(value) =>
                setTasteRating(value ? Number(value) : null)
              }
              className='flex space-x-2'
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <ToggleGroupItem
                  key={value}
                  value={value.toString()}
                  className='w-12 h-12 flex justify-center items-center border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-customGreen focus:outline-none'
                >
                  {value}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>

        {/* Christmas Vibe Section */}
        <div className='flex flex-col space-y-2'>
          <h3 className='text-lg font-bold'>Christmas Vibe</h3>
          <div className='flex justify-between items-center p-2 border border-gray-200 rounded'>
            <ToggleGroup
              type='single'
              value={feelRating !== null ? feelRating.toString() : ''}
              onValueChange={(value) =>
                setFeelRating(value ? Number(value) : null)
              }
              className='flex space-x-2'
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <ToggleGroupItem
                  key={value}
                  value={value.toString()}
                  className='w-12 h-12 flex justify-center items-center border border-gray-300 rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-customGreen focus:outline-none'
                >
                  {value}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </div>

      <div className='mt-8 text-center'>
        <Button
          onClick={handleRatingSubmit}
          className={`w-full h-14 font-bold ${
            step + 1 < beers.length
              ? 'bg-customGreen hover:bg-customHoverGreen text-white'
              : 'bg-orange-900 hover:bg-orange-700 text-white '
          }`}
          disabled={tasteRating === null || feelRating === null}
        >
          {step + 1 < beers.length
            ? 'Save rating & go to next beer'
            : 'Submit Ratings & See Results'}
        </Button>
      </div>
    </main>
  );
}
