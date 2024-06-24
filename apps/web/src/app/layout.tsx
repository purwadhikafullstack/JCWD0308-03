import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/Footer';
import StoreProvider from './storeProvider';
import LoginModalSlice from '@/hooks/login/loginModalSlice';
import { LoginModal } from '@/components/modals/LoginModal';
import { RegisterModal } from '@/components/modals/RegisterModal';
import { Toaster } from '@/components/ui/toaster';

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
        <StoreProvider>
          <RegisterModal />
          <LoginModal />
          {children}
          <Toaster />
          {/* <Footer /> */}
        </StoreProvider>
      </body>
    </html>
  );
}
