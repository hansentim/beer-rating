'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import { BeerCard } from '@/components/rating-card';
import { supabase } from '../../../supabase';
import { useUser } from '@/context/userContext';
import { beers } from '@/data/beers';
import Logo from '@/components/logo';

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
    <>
      <Logo />
      <main className='p-4'>
        <div className='w-full max-w-sm mx-auto'>
          {/* Title */}
          <h1 className='text-4xl text-customGreen font-bold text-left mb-2 mt-10'>
            Beer {step + 1}
          </h1>
          {/* Description */}
          <p className='text-left mb-6 text-custuomSubTitle'>
            Take a sip, then rate the beer from 1 to 5 for its taste and
            Christmas vibe, with 5 being the absolute best in your book!
          </p>

          {/* Beer Card */}
          <BeerCard beer={currentBeer} />

          {/* Ratings Section */}
          <div className='space-y-6 mt-6'>
            {/* Taste Section */}
            <div className='flex flex-col space-y-2'>
              <h3 className='text-lg font-bold'>Taste</h3>
              <div className='p-2 border border-gray-200 rounded'>
                <ToggleGroup
                  type='single'
                  value={tasteRating !== null ? tasteRating.toString() : ''}
                  onValueChange={(value) =>
                    setTasteRating(value ? Number(value) : null)
                  }
                  className='flex justify-between'
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <ToggleGroupItem
                      key={value}
                      value={value.toString()}
                      className={`w-12 h-12 flex justify-center items-center border rounded-full font-bold transition-colors focus:outline-none
                  ${
                    tasteRating === value
                      ? 'bg-customGreen  text-white border-customGreen ring-2 ring-customGreen'
                      : 'bg-white text-gray-800 border-gray-300'
                  }
                 hover:bg-customLightGreen   data-[state=on]:bg-customToggleGreen data-[state=on]:text-white data-[state=on]:ring-white`}
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
              <div className='p-2 border border-gray-200 rounded'>
                <ToggleGroup
                  type='single'
                  value={feelRating !== null ? feelRating.toString() : ''}
                  onValueChange={(value) =>
                    setFeelRating(value ? Number(value) : null)
                  }
                  className='flex justify-between'
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <ToggleGroupItem
                      key={value}
                      value={value.toString()}
                      className={`w-12 h-12 flex justify-center items-center border rounded-full font-bold transition-colors focus:outline-none
                  ${
                    feelRating === value
                      ? 'bg-customGreen  text-white border-customGreen ring-2 ring-customGreen'
                      : 'bg-white text-gray-800 border-gray-300'
                  }
                 hover:bg-customLightGreen   data-[state=on]:bg-customToggleGreen data-[state=on]:text-white data-[state=on]:ring-white`}
                    >
                      {value}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className='mt-8 text-center'>
            <Button
              onClick={handleRatingSubmit}
              className={`w-full h-14 font-bold ${
                step + 1 < beers.length
                  ? 'bg-customGreen hover:bg-customHoverGreen text-white'
                  : 'bg-customBrown hover:bg-customBrownHover text-white '
              }`}
              disabled={tasteRating === null || feelRating === null}
            >
              {step + 1 < beers.length
                ? 'Save rating & go to next beer'
                : 'Submit ratings & view results'}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
