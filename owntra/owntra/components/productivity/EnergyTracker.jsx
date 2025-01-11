// components/productivity/EnergyTracker.jsx
import React, { useState } from 'react';
import { Battery, BatteryMedium, BatteryLow, BatteryCharging } from 'lucide-react';

const EnergyTracker = ({ onEnergyLog }) => {
  const [energyLevel, setEnergyLevel] = useState(null);
  const [note, setNote] = useState('');

  const energyLevels = [
    { value: 100, label: 'High Energy', icon: Battery, color: 'text-green-500' },
    { value: 70, label: 'Good Energy', icon: BatteryMedium, color: 'text-blue-500' },
    { value: 40, label: 'Low Energy', icon: BatteryLow, color: 'text-yellow-500' },
    { value: 10, label: 'Exhausted', icon: BatteryCharging, color: 'text-red-500' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (energyLevel !== null) {
      onEnergyLog({
        level: energyLevel,
        note,
        timestamp: new Date().toISOString(),
      });
      setNote('');
      setEnergyLevel(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Daily Energy Tracker</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {energyLevels.map(({ value, label, icon: Icon, color }) => (
            <button
              key={value}
              type="button"
              onClick={() => setEnergyLevel(value)}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                energyLevel === value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              } flex flex-col items-center gap-2`}
            >
              <Icon className={`w-6 h-6 ${
                energyLevel === value ? color : 'text-gray-400'
              }`} />
              <span className={`text-sm ${
                energyLevel === value ? 'text-blue-500 font-medium' : 'text-gray-600'
              }`}>
                {label}
              </span>
            </button>
          ))}
        </div>

        <div className="mb-4">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note about your energy level (optional)"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
            rows="3"
          />
        </div>

        <button
          type="submit"
          disabled={energyLevel === null}
          className={`w-full py-2 px-4 rounded-lg ${
            energyLevel === null
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          } transition-colors duration-200`}
        >
          Log Energy Level
        </button>
      </form>
    </div>
  );
};

export default EnergyTracker;