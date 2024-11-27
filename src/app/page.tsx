'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (name.trim()) {
      localStorage.setItem('userName', name.trim());
      router.push('/beers');
    } else {
      alert('Please enter your name!');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50'>
      <div className='max-w-md w-full bg-white shadow-md rounded-lg p-6'>
        <h1 className='text-2xl font-bold text-center mb-4'>
          Welcome to the Beer Rating App!
        </h1>
        <p className='text-center mb-6'>Enter your name to get started:</p>
        <Input
          placeholder='Your name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='mb-4'
        />
        <Button
          onClick={handleLogin}
          className='w-full bg-blue-500 text-white hover:bg-blue-600'
        >
          Start Rating Beers
        </Button>
      </div>
    </div>
  );
}
