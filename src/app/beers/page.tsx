'use client';

import { supabase } from '../../../supabase';
//import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/userContext';
import { BeerCard } from '@/components/beer-card';
import Link from 'next/link';

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

export default function BeersPage() {
  const { userName } = useUser();
  console.log('UserName on BeersPage:', userName);

  const handleRatingSubmit = async (beerId: number, rating: number) => {
    console.log('Submitting rating for beer:', { beerId, rating });
    try {
      const { data, error } = await supabase.from('ratings').insert([
        {
          beer_id: beerId,
          rating: rating,
          user_name: userName,
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      console.log('Rating submitted:', data);
    } catch (e) {
      console.error('Error submitting rating:', e);
    }
  };

  return (
    <main className='p-4'>
      <h1 className='text-xl font-bold text-center mb-4'>
        Hey {userName}, let’s rate some beers!
      </h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {beers.map((beer) => (
          <BeerCard
            key={beer.id}
            beer={beer}
            onSubmitRating={handleRatingSubmit}
          />
        ))}
      </div>
      <div className='mt-8 text-center'>
        <Link
          href='/results'
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          See Results
        </Link>
      </div>
    </main>
  );
}
