'use client';
import Image from 'next/image';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BeerCardProps } from '@/types';
import { Badge } from '@/components/ui/badge';

export function BeerCard({ beer }: BeerCardProps) {
  return (
    <Card className='relative w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-none'>
      <CardContent className='p-4'>
        {/* Image Section */}
        <div className='w-full h-40 relative mb-4'>
          <Image
            src={beer.imageUrl}
            alt={beer.name}
            fill
            className='object-contain rounded-lg'
          />
        </div>

        {/* Header Section */}
        <CardHeader className='p-0'>
          <CardTitle className='text-4xl font-bold text-black'>
            {beer.name}
          </CardTitle>
          <p className='text-base font-medium text-black'>{beer.brewery}</p>
        </CardHeader>

        {/* Badge Section */}
        <div className='flex flex-wrap gap-2 mt-4 pointer-events-none'>
          <Badge className='bg-customBadgeGreen rounded-full text-black shadow-none text-sm'>
            {beer.taste}
          </Badge>
          <Badge className='bg-customBadgeGreen2 rounded-full text-black shadow-none text-sm'>
            {beer.location}
          </Badge>
          <Badge className='bg-customBadgePink rounded-full text-black shadow-none text-sm'>
            {beer.ml}
          </Badge>
          <Badge className='bg-customBadgePurple rounded-full text-black shadow-none text-sm'>
            {beer.alcoholContent}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
