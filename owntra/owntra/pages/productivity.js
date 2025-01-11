// pages/productivity.js
import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TaskTimer from '../components/productivity/TaskTimer';
import EnergyTracker from '../components/productivity/EnergyTracker';
import ProgressReport from '../components/productivity/ProgressReport';

export default function Productivity() {
  const [productiveTime, setProductiveTime] = useState(0);
  const [energyLogs, setEnergyLogs] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTime = localStorage.getItem('productiveTime');
    const savedLogs = localStorage.getItem('energyLogs');
    const savedTasks = localStorage.getItem('completedTasks');
    
    if (savedTime) setProductiveTime(parseInt(savedTime));
    if (savedLogs) setEnergyLogs(JSON.parse(savedLogs));
    if (savedTasks) setCompletedTasks(JSON.parse(savedTasks));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('productiveTime', productiveTime.toString());
    localStorage.setItem('energyLogs', JSON.stringify(energyLogs));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [productiveTime, energyLogs, completedTasks]);

  const handleTaskComplete = (timeSpent) => {
    setProductiveTime(prev => prev + timeSpent);
    const newTask = {
      id: Date.now(),
      timeSpent,
      completedAt: new Date().toISOString()
    };
    setCompletedTasks(prev => [...prev, newTask]);
  };

  const handleEnergyLog = (log) => {
    setEnergyLogs(prev => [...prev, log]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Your Productivity Dashboard</h1>
            <p className="mt-2 text-gray-600">Track your tasks, energy, and progress all in one place</p>
          </div>

          {/* Task Timer Section */}
          <section>
            <TaskTimer onTaskComplete={handleTaskComplete} />
          </section>

          {/* Energy Tracker Section */}
          <section>
            <EnergyTracker onEnergyLog={handleEnergyLog} />
          </section>

          {/* Progress Report Section */}
          <section>
            <ProgressReport
              productiveTime={productiveTime}
              energyLogs={energyLogs}
              completedTasks={completedTasks}
            />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}