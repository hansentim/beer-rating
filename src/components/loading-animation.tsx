'use client';

import React, { useEffect, useState } from 'react';
import Player from 'lottie-react';
import animationData from '@/lottie/lottie-beers.json';

export default function LoadingAnimation() {
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
        Did you know that Christmas beer, often brewed with spices like cinnamon
        and nutmeg, has been a festive tradition in many cultures for centuries?
      </p>
    </div>
  );
}
