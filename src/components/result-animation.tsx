'use client';

import React, { useEffect, useState } from 'react';
import Player from 'lottie-react';
import animationData from '@/lottie/beer-result.json';

export default function ResultAnimation() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className='bg-customGreen flex flex-col items-center justify-center p-4 space-y-4 fixed inset-0'>
      <Player
        animationData={animationData}
        loop
        autoplay
        style={{ height: '300px', width: '300px' }}
      />
      <p className='text-center text-customYellow text-base max-w-xl'>
        Santa is fetching the results...
      </p>
    </div>
  );
}
