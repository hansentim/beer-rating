import type { Metadata } from 'next';
import { Afacad } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@/context/userContext';
//import Logo from '@/components/logo';

const afacad = Afacad({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-afacad',
});

export const metadata: Metadata = {
  title: 'Christmas Beer Tasting',
  description: "Let's taste the best beer of the year",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${afacad.variable} antialiased`}>
        <UserProvider>
          {/* <Logo /> */}

          {/* <div className='mt-20'> */}
          <main className='mt-6'>{children}</main>
          {/* </div> */}
        </UserProvider>
      </body>
    </html>
  );
}
