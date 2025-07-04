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
    try {
      const savedTime = localStorage.getItem('productiveTime');
      const savedLogs = localStorage.getItem('energyLogs');
      const savedTasks = localStorage.getItem('completedTasks');
      
      if (savedTime) setProductiveTime(parseInt(savedTime));
      if (savedLogs) setEnergyLogs(JSON.parse(savedLogs));
      if (savedTasks) setCompletedTasks(JSON.parse(savedTasks));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('productiveTime', productiveTime.toString());
      localStorage.setItem('energyLogs', JSON.stringify(energyLogs));
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    } catch (error) {
      console.error('Error saving data:', error);
    }
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
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Your Productivity Dashboard</h1>
            <p className="mt-2 text-gray-600">Track your tasks, energy, and progress all in one place</p>
          </div>

          <section>
            <TaskTimer onTaskComplete={handleTaskComplete} />
          </section>

          <section>
            <EnergyTracker onEnergyLog={handleEnergyLog} />
          </section>

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