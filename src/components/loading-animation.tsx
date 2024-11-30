'use client';

import React from 'react';
import Player from 'lottie-react';
import animationData from '@/lottie/lottie-beers.json';
export default function LoadingAnimation() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-customGreen'>
      <Player
        animationData={animationData}
        loop
        autoplay
        style={{ height: '300px', width: '300px' }}
      />
    </div>
  );
}
