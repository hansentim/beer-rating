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
