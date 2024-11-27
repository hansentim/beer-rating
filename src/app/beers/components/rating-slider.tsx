import React from 'react';
import * as Slider from '@radix-ui/react-slider';

interface RatingSliderProps {
  value: number[];
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function RatingSlider({ value, onChange }: RatingSliderProps) {
  return (
    <Slider.Root
      className='relative flex items-center select-none touch-none w-full h-5'
      value={value}
      max={5}
      step={0.5}
      onValueChange={(newValue) => onChange(newValue[0])} // Extract the first element
    >
      <Slider.Track className='bg-slate-200 relative grow rounded-full h-2'>
        <Slider.Range className='absolute bg-yellow-400 rounded-full h-full' />
      </Slider.Track>
      <Slider.Thumb
        className='block w-5 h-5 bg-white shadow-md rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-yellow-400'
        aria-label='Rating'
      />
    </Slider.Root>
  );
}
