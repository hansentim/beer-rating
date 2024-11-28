'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const { setUserName } = useUser();
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setUserName(name);
      router.push('/beers');
    }
  };

  return (
    <main className='flex flex-col items-center justify-center min-h-screen p-4 bg-white'>
      <div className='mb-8'>
        <Image
          src='/images/beer-login.svg'
          alt='Christmas Tree'
          width={400}
          height={400}
          className='mx-auto'
        />
      </div>

      <h1 className='text-3xl font-bold text-center mb-2'>
        <span className='text-customGreen'>Hello</span>, beer drinker!
      </h1>

      <p className='text-center text-gray-500 mb-6'>
        We need to know who you are before we get going
      </p>

      <form onSubmit={handleSubmit} className='w-full max-w-sm space-y-4'>
        <Input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full'
        />

        <Button
          type='submit'
          className='w-full bg-customGreen hover:bg-customHoverGreen text-white'
        >
          Continue
        </Button>
      </form>
    </main>
  );
}
