import Image from 'next/image';
import { Coiny } from 'next/font/google';

const coinFont = Coiny({ subsets: ['latin'], weight: ['400'] });

export default function Logo() {
  return (
    <header className='absolute top-4 left-4 flex items-center space-x-1'>
      {/* Logo Image */}
      <Image
        src='/images/beer-logo.png'
        alt='SipHappns Logo'
        width={45}
        height={45}
        className='object-contain'
      />

      {/* Logo Text */}
      <h1 className={`text-lg font-bold ${coinFont.className}`}>SipHappns</h1>
    </header>
  );
}
