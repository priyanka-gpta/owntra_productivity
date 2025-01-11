// pages/index.js
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FeatureSection from '../components/home/FeatureSection';
import { ArrowRight, Clock, Brain, ChartLine } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: Clock,
      title: "Smart Task Tracking",
      description: "Track your tasks with built-in timers that help you understand where your time goes. Complete tasks with satisfaction and build momentum."
    },
    {
      icon: Brain,
      title: "Energy Management",
      description: "Monitor your daily energy levels to identify peak productivity periods and optimize your work schedule accordingly."
    },
    {
      icon: ChartLine,
      title: "Progress Insights",
      description: "Get detailed reports on your productivity patterns, helping you make data-driven decisions about your work habits."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <main>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Take control of your</span>
                <span className="block text-blue-600">productivity journey</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Owntra helps freelancers, creators, and founders track their productivity, 
                manage energy levels, and achieve their goals with clarity.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <Link
                  href="/productivity"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

                <FeatureSection />
      </main>
      <Footer />
    </div>
  );
}