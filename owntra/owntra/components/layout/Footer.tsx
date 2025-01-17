// components/layout/Footer.jsx
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <Link href="/" className="text-xl font-semibold text-gray-900">
              Owntra
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              Empowering freelancers, creators, and founders to achieve their best work.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/productivity" className="text-sm text-gray-600 hover:text-gray-900">
                  Productivity Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-gray-600">
                <a href="mailto:hello.owntra@gmail.com" className="hover:text-gray-900">
                hello.owntra@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} Owntra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;