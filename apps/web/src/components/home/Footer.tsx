import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t-4 rounded-t-3xl">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2">
          <div className="border-b border-gray-100 py-8 lg:order-last lg:border-b-0 lg:border-s lg:py-16 lg:ps-16">
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
            <div className="mt-8 space-y-4 lg:mt-0">
              <span className="hidden h-1 w-10 rounded bg-[#00a7c4] lg:block"></span>
              <div>
                <h2 className="text-2xl font-medium text-gray-900">
                  About Stay Easy
                </h2>
                <p className="mt-4 max-w-lg text-gray-500">
                  Property rental management system, is a digital solution
                  designed to facilitate the renting process of properties such
                  as apartments, houses, office spaces, and vacation rentals.
                </p>
              </div>
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
              <FooterSection title="Services" links={servicesLinks} />
              <FooterSection title="Supports" links={supportsLinks} />
              <FooterSection title="Helpful Links" links={helpfulLinks} />
            </div>
            <div className="mt-8 border-t border-gray-100 pt-8">
              <ul className="flex flex-wrap gap-4 text-xs">
                {footerLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-gray-500 transition hover:opacity-75">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs text-gray-500">
                &copy; 2022. Company Name. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterSection = ({ title, links}: { title: string; links: string[] }) => (
  <div>
    <p className="font-medium text-gray-900">{title}</p>
    <ul className="mt-6 space-y-4 text-sm">
      {links.map((link, idx) => (
        <li key={idx}>
          <a href="#" className="text-gray-700 transition hover:opacity-75">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const servicesLinks = [
  '1on1 Coaching', 'Company Review', 'Accounts Review', 
  'HR Consulting', 'SEO Optimisation'
];
const supportsLinks = ['About', 'Meet the Team', 'Accounts Review'];
const helpfulLinks = ['Contact', 'FAQs', 'Live Chat'];
const footerLinks = ['Terms & Conditions', 'Privacy Policy', 'Cookies'];

export default Footer;
