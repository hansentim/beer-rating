import Image from 'next/image';

export default function Logo() {
  return (
    <header className='absolute top-4 left-4'>
      <Image
        src='/images/logo.png'
        alt='SipHappns Logo'
        width={80}
        height={80}
        className='object-contain'
      />
    </header>
  );
}
