// components/productivity/TaskTimer.jsx
import React, { useState, useEffect } from 'react';
import { PlusCircle, Play, Pause, Check } from 'lucide-react';

const TaskTimer = ({ onTaskComplete }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [currentDate] = useState(new Date().toLocaleDateString());

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const task = {
      id: Date.now(),
      title: newTask,
      timeSpent: 0,
      isRunning: false,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTimer = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, isRunning: !task.isRunning };
      }
      return task;
    }));
  };

  const completeTask = (taskId) => {
    const taskToComplete = tasks.find(task => task.id === taskId);
    if (taskToComplete) {
      onTaskComplete(taskToComplete.timeSpent);
      setTasks(tasks.map(task => {
        if (task.id === taskId) {
          return { ...task, completed: true, isRunning: false };
        }
        return task;
      }));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prevTasks => 
        prevTasks.map(task => ({
          ...task,
          timeSpent: task.isRunning ? task.timeSpent + 1 : task.timeSpent,
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Today's Tasks</h2>
        <p className="text-gray-600">{currentDate}</p>
      </div>

      <form onSubmit={addTask} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button
            type="submit"
            className="p-2 text-blue-600 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 rounded-lg"
          >
            <PlusCircle className="w-6 h-6" />
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {tasks.map(task => (
          <div
            key={task.id}
            className="p-4 border border-gray-100 rounded-lg flex items-center justify-between bg-white"
          >
            <div className="flex-1">
              <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                {task.title}
              </h3>
              <p className="text-sm text-gray-600">{formatTime(task.timeSpent)}</p>
            </div>
            <div className="flex gap-2">
              {!task.completed && (
                <>
                  <button
                    onClick={() => toggleTimer(task.id)}
                    className="p-2 text-gray-600 hover:text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {task.isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => completeTask(task.id)}
                    className="p-2 text-green-600 hover:text-green-700 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTimer;