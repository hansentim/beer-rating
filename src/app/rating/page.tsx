'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'; // Custom ShadCN-based component
import { Button } from '@/components/ui/button';
import { BeerCard } from '@/components/menu-beercard';
import { supabase } from '../../../supabase';
import { useUser } from '@/context/userContext';

const beers = [
  {
    id: 1,
    name: 'Lusse Lelle',
    description:
      'Kryddig, mycket syrlig smak med tydlig karaktär av saffran, inslag av vetebröd och apelsin.',
    imageUrl: '/images/lelle.webp',
    alcoholContent: '6 % vol.',
  },
  {
    id: 2,
    name: 'Stigbergets Juleljus NEIPA',
    description:
      'Humlearomatisk smak med tydlig beska och liten sötma, inslag av ananas, grapefrukt, honung, sockerkaka och tallbarr.',
    imageUrl: '/images/stigberg.webp',
    alcoholContent: '6,8 % vol.',
  },
  {
    id: 3,
    name: 'Poppels Bryggeri Glögg Sour 2024',
    description:
      'Kryddig, bärig, mycket syrlig smak med inslag av svarta vinbär, kardemumma, blåbär, ingefära, körsbär, pomerans och kanel.',
    imageUrl: '/images/poppel.webp',
    alcoholContent: '4,5 % vol.',
  },
  {
    id: 4,
    name: 'Benchwarmers Brewing Julbordsöl',
    description:
      'Maltig smak med inslag av knäckebröd, honung, kryddor, ljus choklad och citrusskal.',
    imageUrl: '/images/honey.webp',
    alcoholContent: '5,6 % vol.',
  },
  {
    id: 5,
    name: 'Coppersmith´s Julöl',
    description:
      'Maltig smak med tydlig beska, inslag av rågbröd, kryddor, apelsinskal och nötter.',
    imageUrl: '/images/copper.webp',
    alcoholContent: '5 % vol.',
  },
  {
    id: 6,
    name: 'Train Station Brewery Jul IPA Alkoholfri, Glutenfri',
    description:
      'Humlearomatisk smak med tydlig beska och liten sötma, inslag av grapefrukt, sockerkaka, mango, tallkåda och pomerans.',
    imageUrl: '/images/train.webp',
    alcoholContent: '0.3 % vol.',
  },
];

export default function BeerRatingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [tasteRating, setTasteRating] = useState<number | null>(null);
  const [feelRating, setFeelRating] = useState<number | null>(null);
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
        router.push('/results');
      }
    } catch (e) {
      console.error('Error submitting rating:', e);
    }
  };

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
        <div>
          <h3 className='text-lg font-bold mb-2'>Taste</h3>
          <ToggleGroup
            type='single'
            value={tasteRating !== null ? tasteRating.toString() : ''}
            onValueChange={(value) =>
              setTasteRating(value ? Number(value) : null)
            }
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <ToggleGroupItem key={value} value={value.toString()}>
                {value}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div>
          <h3 className='text-lg font-bold mb-2'>Christmas Feel</h3>
          <ToggleGroup
            type='single'
            value={feelRating !== null ? feelRating.toString() : ''}
            onValueChange={(value) =>
              setFeelRating(value ? Number(value) : null)
            }
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <ToggleGroupItem key={value} value={value.toString()}>
                {value}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      <div className='mt-8 text-center'>
        <Button
          onClick={handleRatingSubmit}
          className='w-full bg-customGreen hover:bg-customHoverGreen text-white'
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
