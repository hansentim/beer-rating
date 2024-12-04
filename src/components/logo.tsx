import Image from 'next/image';

export default function Logo() {
  return (
    <header className='fixed top-4 left-4 z-50'>
      <div className='w-20 h-20'>
        <Image
          src='/images/logo.png'
          alt='SipHappns Logo'
          width={160}
          height={160}
          className='object-contain'
        />
      </div>
    </header>
  );
}
