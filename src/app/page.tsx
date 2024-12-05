'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';

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
    return <LoadingAnimation />;
  }

  return (
    <>
      <Logo />
      <main className='flex flex-col justify-center items-center p-4 bg-white'>
        {/* Header Section */}
        <div className='flex flex-col items-start w-full max-w-sm'>
          <Image
            src='/images/skate.png'
            alt='Christmas Tree'
            width={180}
            height={180}
            className='mx-auto'
          />
          <h1 className='text-4xl font-bold mt-2 text-left'>
            <span className='text-customGreen'>Hello</span>, beer drinker 🍻
          </h1>
          <p className='text-xl text-left mt-2 mb-4 text-custuomSubTitle'>
            Let’s start with your name so we know who’s joining the tasting!
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center w-full max-w-sm mt-4 space-y-3'
        >
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
      </main>
    </>
  );
}
