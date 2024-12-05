import Image from 'next/image';
import { Coiny } from 'next/font/google';
//import { Work_Sans } from 'next/font/google';

const coinFont = Coiny({ subsets: ['latin'], weight: ['400'] });
// const workSansFont = Work_Sans({
//   subsets: ['latin'],
//   weight: ['700'],
// });

export default function Logo() {
  return (
    <header className='absolute top-4 left-4 flex items-center space-x-1'>
      {/* Logo Image */}
      <Image
        src='/images/beer-logo.png'
        alt='SipHappns Logo'
        width={35}
        height={35}
        className='object-contain'
      />

      {/* Logo Text */}
      <h1 className={`text-lg font-bold ${coinFont.className}`}>SipHappns</h1>
    </header>
  );
}
