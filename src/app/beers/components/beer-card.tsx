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
  rating: number;
  imageUrl: string;
}

interface BeerCardProps {
  beer: Beer;
}

export function BeerCard({ beer }: BeerCardProps) {
  const [rating, setRating] = useState(beer.rating);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate an API call to submit the rating
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert(`You rated ${beer.name} ${rating.toFixed(1)} stars!`);
    setIsSubmitting(false);
  };

  return (
    <Card className='w-full max-w-sm mx-auto'>
      <CardHeader>
        <div className='w-full h-48 relative mb-4'>
          <Image
            src={beer.imageUrl}
            alt={beer.name}
            width={300}
            height={200}
            className='absolute inset-0 w-full h-full object-cover rounded-t-lg'
          />
        </div>
        <CardTitle>{beer.name}</CardTitle>
        <CardDescription>{beer.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-between mb-4'>
          <span className='text-sm font-medium'>
            Rating: {rating.toFixed(1)}
          </span>
          <RatingSlider value={rating} onChange={setRating} />
        </div>
      </CardContent>
      <CardFooter className='flex flex-col items-center space-y-2'>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className='w-full'
        >
          {isSubmitting ? (
            <>Submitting...</>
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
