import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/navbar/Navbar';
import { RegisterModal } from '@/components/modals/RegisterModal';
import { LoginModal } from '@/components/modals/LoginModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%S | Stay Easy',
    default: 'Stay Easy',
  },
  description: 'Anything you need to Stay Easy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RegisterModal />
        <LoginModal />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
