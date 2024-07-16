import Image from 'next/image';
import React from 'react';
import { Separator } from '../ui/separator';
import Logo from '../navbar/Logo';

const Footer = () => {
  return (
<footer className="bg-white border-t-4 rounded-t-3xl">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="lg:grid lg:grid-cols-2">
      <div
        className="border-b border-gray-100 py-8 lg:order-last lg:border-b-0 lg:border-s lg:py-16 lg:ps-16"
      >
        <div className="block text-teal-600 lg:hidden">
        <Image
          src="/images/logo tulisan.png"
          alt="logo"
          width={100}
          height={100}
          className="cursor-pointer w-auto h-auto"
          priority
        /> 
        </div>
      </div>

      <div className="py-8 lg:py-16 lg:pe-16">
        <div className="hidden text-teal-600 lg:block">
        <Image
          src="/images/logo tulisan.png"
          alt="logo"
          width={200}
          height={200}
          className="hidden sm:block cursor-pointer w-auto h-auto"
          priority
        /> 
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <p className="font-medium text-gray-900">Services</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> 1on1 Coaching </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Company Review </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Accounts Review </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> HR Consulting </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> SEO Optimisation </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900">Supports</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> About </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Meet the Team </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Accounts Review </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium text-gray-900">Helpful Links</p>

            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Contact </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> FAQs </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 transition hover:opacity-75"> Live Chat </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-8">
          <ul className="flex flex-wrap gap-4 text-xs">
            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75"> Terms & Conditions </a>
            </li>

            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75"> Privacy Policy </a>
            </li>

            <li>
              <a href="#" className="text-gray-500 transition hover:opacity-75"> Cookies </a>
            </li>
          </ul>

          <p className="mt-8 text-xs text-gray-500">&copy; 2022. Company Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  </div>
</footer>
  );
};

export default Footer;
