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
import { BeerCardProps } from '@/types';

export function BeerCard({ beer }: BeerCardProps) {
  return (
    <Card className='relative w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg'>
      <div className='absolute top-0 left-0 w-full h-1/3 bg-customYellow z-0'></div>
      <CardContent className='relative z-10 p-4'>
        <div className='w-full h-48 relative mb-4'>
          <Image
            src={beer.imageUrl}
            alt={beer.name}
            fill
            className='object-contain rounded-lg'
          />
        </div>
        <CardHeader>
          <CardTitle className='text-xl font-bold'>{beer.name}</CardTitle>
          <CardDescription className='text-sm text-gray-600'>
            {beer.description}
          </CardDescription>
          <p className='text-sm text-gray-500'>
            Alcohol: {beer.alcoholContent}
          </p>
        </CardHeader>
      </CardContent>
    </Card>
  );
}
