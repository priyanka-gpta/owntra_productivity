// components/home/FeatureSection.jsx
import React from 'react';
import { Clock, Brain, ChartLine, Target, Zap, Users } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Time Management",
      description: "Track your tasks with intelligent timers and get insights into your time allocation patterns."
    },
    {
      icon: Brain,
      title: "Energy Tracking",
      description: "Monitor your daily energy levels to optimize your work schedule and maximize productivity."
    },
    {
      icon: ChartLine,
      title: "Progress Analytics",
      description: "Visualize your productivity trends and make data-driven decisions about your work habits."
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Set clear objectives and track your progress towards achieving them effectively."
    },
    {
      icon: Zap,
      title: "Focus Enhancement",
      description: "Stay focused with our built-in timer system and task completion tracking."
    },
    {
      icon: Users,
      title: "Made for Professionals",
      description: "Designed specifically for freelancers, creators, and founders to boost their productivity."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Features</h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to maximize your productivity
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="group relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4 group-hover:bg-blue-600 transition-colors duration-200">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;