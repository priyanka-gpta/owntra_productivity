// components/productivity/ProgressReport.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, Clock, Battery } from 'lucide-react';

const ProgressReport = ({ productiveTime, energyLogs, completedTasks = [] }) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Filter today's completed tasks
  const todaysCompletedTasks = completedTasks.filter(task => 
    new Date(task.completedAt).toISOString().split('T')[0] === today
  );

  // Get today's energy log
  const todaysEnergyLog = energyLogs.find(log => 
    new Date(log.timestamp).toISOString().split('T')[0] === today
  );

  // Calculate daily stats
  const dailyStats = {
    tasksCompleted: todaysCompletedTasks.length,
    hoursSpent: formatTime(productiveTime),
    energyLevel: todaysEnergyLog ? todaysEnergyLog.level : 'Not logged'
  };

  // Prepare data for the chart
  const getChartData = () => {
    if (!energyLogs || energyLogs.length === 0) return [];
    
    return energyLogs.map(log => ({
      date: new Date(log.timestamp).toLocaleDateString(),
      energy: log.level,
      productiveHours: Math.round(productiveTime / 3600), // Convert seconds to hours
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Today's Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Tasks Completed */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tasks Completed</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {dailyStats.tasksCompleted}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        {/* Time Spent */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Time Spent</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {dailyStats.hoursSpent}
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        {/* Energy Level */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Energy Level</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {typeof dailyStats.energyLevel === 'number' ? `${dailyStats.energyLevel}%` : dailyStats.energyLevel}
              </p>
            </div>
            <Battery className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Progress Over Time</h3>
        <div className="h-80 bg-gray-50 p-4 rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={getChartData()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="energy"
                stroke="#9333ea"
                name="Energy Level (%)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="productiveHours"
                stroke="#3b82f6"
                name="Productive Hours"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProgressReport;