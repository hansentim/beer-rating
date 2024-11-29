'use client';

import React from 'react';
import { useUser } from '@/context/userContext';
import { BeerCard } from '@/components/menu-beercard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const beers = [
  {
    id: 1,
    name: 'Lusse Lelle',
    description:
      'Kryddig, mycket syrlig smak med tydlig karaktär av saffran, inslag av vetebröd och apelsin.',
    imageUrl: '/images/lelle.webp',
    alcoholContent: '6 % vol.',
    rating: 0,
  },
  {
    id: 2,
    name: 'Stigbergets Juleljus NEIPA',
    description:
      'Humlearomatisk smak med tydlig beska och liten sötma, inslag av ananas, grapefrukt, honung, sockerkaka och tallbarr.',
    imageUrl: '/images/stigberg.webp',
    alcoholContent: '6,8 % vol.',
    rating: 0,
  },
  {
    id: 3,
    name: 'Poppels Bryggeri Glögg Sour 2024',
    description:
      'Kryddig, bärig, mycket syrlig smak med inslag av svarta vinbär, kardemumma, blåbär, ingefära, körsbär, pomerans och kanel.',
    imageUrl: '/images/poppel.webp',
    alcoholContent: '4,5 % vol.',
    rating: 0,
  },
  {
    id: 4,
    name: 'Benchwarmers Brewing Julbordsöl',
    description:
      'Maltig smak med inslag av knäckebröd, honung, kryddor, ljus choklad och citrusskal.',
    imageUrl: '/images/honey.webp',
    alcoholContent: '5,6 % vol.',
    rating: 0,
  },
  {
    id: 5,
    name: 'Coppersmith´s Julöl',
    description:
      'Maltig smak med tydlig beska, inslag av rågbröd, kryddor, apelsinskal och nötter.',
    imageUrl: '/images/copper.webp',
    alcoholContent: '5 % vol.',
    rating: 0,
  },
  {
    id: 6,
    name: 'Train Station Brewery Jul IPA Alkoholfri, Glutenfri',
    description:
      'Humlearomatisk smak med tydlig beska och liten sötma, inslag av grapefrukt, sockerkaka, mango, tallkåda och pomerans.',
    imageUrl: '/images/train.webp',
    alcoholContent: '0.3 % vol.',
    rating: 0,
  },
];

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
