// components/layout/Header.jsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-semibold">Owntra</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link href="/productivity" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">
                Productivity
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;