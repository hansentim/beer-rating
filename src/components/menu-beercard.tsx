'use client';
import Image from 'next/image';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Beer {
  id: number;
  name: string;
  description: string;
  alcoholContent: string;
  imageUrl: string;
}

interface BeerCardProps {
  beer: Beer;
}

export function BeerCard({ beer }: BeerCardProps) {
  return (
    <Card className='relative w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg'>
      <div className='absolute top-0 left-0 w-full h-1/3 bg-customYellow'></div>

      <CardContent className='relative z-10 p-4'>
        <div className='w-full h-48 relative mb-4'>
          <Image
            src={beer.imageUrl}
            alt={beer.name}
            fill
            className='object-contain'
          />
        </div>

        <CardHeader className='relative text-center'>
          <CardTitle className='text-xl text-start font-bold'>
            {beer.name}
          </CardTitle>
          <CardDescription className='text-sm text-start text-gray-700'>
            {beer.description}
          </CardDescription>
          <p className='text-sm text-start text-gray-600'>
            Alcohol: {beer.alcoholContent}
          </p>
        </CardHeader>
      </CardContent>
    </Card>
  );
}
