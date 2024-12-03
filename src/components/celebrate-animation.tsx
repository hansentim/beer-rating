'use client';

import React from 'react';
import Player from 'lottie-react';
import animationData from '@/lottie/celebrate.json';

const TopRankAnimation: React.FC = () => {
  return (
    <div className='w-20 h-20'>
      <Player
        animationData={animationData}
        loop
        autoplay
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default TopRankAnimation;
