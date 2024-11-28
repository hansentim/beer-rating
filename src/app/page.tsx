'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';

export default function StartPage() {
  const { setUserName } = useUser();
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      console.log('UserName entered:', name);
      setUserName(name);
      router.push('/beers');
    }
  };

  return (
    <main className='p-4'>
      <h1 className='text-xl font-bold text-center mb-6'>
        Welcome to the Beer Rating App!
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <input
          type='text'
          placeholder='Enter your name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='mb-4 p-2 border border-gray-300 rounded'
        />
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Start Rating
        </button>
      </form>
    </main>
  );
}
