'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RatingSlider } from './rating-slider';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface Beer {
  id: number;
  name: string;
  description: string;
  alcoholContent: string;
  rating: number;
  imageUrl: string;
}

interface BeerCardProps {
  beer: Beer;
  onSubmitRating: (beerId: number, rating: number) => void;
}

export function BeerCard({ beer, onSubmitRating }: BeerCardProps) {
  const [rating, setRating] = useState<number>(beer.rating);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    onSubmitRating(beer.id, rating);
    setIsSubmitted(true);
  };

  return (
    <Card className='relative w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg'>
      <div className='absolute top-0 left-0 w-full h-1/3 bg-customYellow'></div>

      <CardContent className='relative z-10 p-4'>
        <div className='w-full h-48 relative mb-4'>
          <Image
            src={beer.imageUrl}
            alt={beer.name}
            fill
            className='object-contain '
          />
        </div>

        <CardHeader className='relative text-center'>
          <CardTitle className='text-xl font-bold'>{beer.name}</CardTitle>
          <CardDescription className='text-sm text-gray-700'>
            {beer.description}
          </CardDescription>
          <p className='text-sm text-gray-600'>
            Alcohol: {beer.alcoholContent}
          </p>
        </CardHeader>

        <div className='mt-6'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium'>
              Rating: {rating.toFixed(1)}
            </span>
            <RatingSlider
              value={[rating]}
              onChange={setRating}
              disabled={isSubmitted}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className='relative z-20 bg-white px-4 py-4'>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitted}
          className={`w-full text-black bg-customYellow hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 ${
            isSubmitted ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitted ? (
            <>Rating Submitted</>
          ) : (
            <>
              <Check className='mr-2 h-4 w-4' /> Submit Rating
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
