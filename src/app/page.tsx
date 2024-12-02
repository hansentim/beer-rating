'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LoadingAnimation = dynamic(
  () => import('@/components/loading-animation'),
  { ssr: false }
);

export default function LoginPage() {
  const { setUserName } = useUser();
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setUserName(name);
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 3500));

      router.push('/menu');
    }
  };

  if (isLoading) {
    return (
      <main className='bg-customGreen flex flex-col items-center justify-center min-h-screen p-4 space-y-4'>
        <LoadingAnimation />
        <p className='text-center text-lg text-white'>
          Did you know that Christmas beer, often brewed with spices like
          cinnamon and nutmeg, has been a festive tradition in many cultures for
          centuries?
        </p>
      </main>
    );
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen p-4 bg-white'>
      <div className='mb-8'>
        <Image
          src='/images/skate.png'
          alt='Christmas Tree'
          width={300}
          height={300}
          className='mx-auto'
        />
      </div>

      <div className='w-full max-w-sm'>
        <h1 className='text-3xl font-bold mb-2'>
          <span className='text-customGreen'>Hello</span>, beer drinker 🍻
        </h1>

        <p className='text-gray-500 mb-6'>
          We need to know who you are before we get going
        </p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full h-14'
          />

          <Button
            type='submit'
            className='w-full h-14 bg-customGreen hover:bg-customHoverGreen text-white'
          >
            Continue
          </Button>
        </form>
      </div>
    </main>
  );
}
