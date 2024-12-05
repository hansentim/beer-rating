'use client';

import React from 'react';
import Player from 'lottie-react';
import animationData from '@/lottie/confetti.json';

const TopRankAnimation: React.FC = () => {
  return (
    <div className='absolute inset-0 z-50 flex items-center justify-center'>
      <Player
        animationData={animationData}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default TopRankAnimation;
