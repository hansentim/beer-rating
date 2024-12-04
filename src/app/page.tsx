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

      await new Promise((resolve) => setTimeout(resolve, 3000));

      router.push('/menu');
    }
  };

  if (isLoading) {
    return (
      <main className='bg-customGreen flex flex-col items-center justify-center p-4 space-y-4 fixed inset-0'>
        <LoadingAnimation />
      </main>
    );
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen p-4 bg-white'>
      <div className='mb-4'>
        <Image
          src='/images/skate.png'
          alt='Christmas Tree'
          width={200}
          height={200}
          className='mx-auto'
        />
      </div>

      <div className='w-full max-w-sm'>
        <h1 className='text-4xl font-bold mb-2'>
          <span className='text-customGreen'>Hello</span>, beer drinker 🍻
        </h1>

        <p className='text-xl text-#484848 mb-8'>
          Let’s start with your name so we know who’s joining the tasting!
        </p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full h-16'
          />

          <Button
            type='submit'
            className='w-full text-base h-16 bg-customGreen hover:bg-customHoverGreen text-white font-bold'
          >
            Continue
          </Button>
        </form>
      </div>
    </main>
  );
}
