'use client';

import React, { useState, useEffect } from 'react';
import { 
  Power, 
  Pause, 
  XCircle, 
  Home, 
  Battery, 
  Wifi,
  Camera,
  Package,
  CheckCircle,
  Activity
} from 'lucide-react';

export default function RoverDashboard() {
  const [roverStatus, setRoverStatus] = useState('Idle');
  const [batteryLevel, setBatteryLevel] = useState(87);
  const [connectionStatus, setConnectionStatus] = useState('Connected');
  const [scannedItems, setScannedItems] = useState(12);
  const [currentScan, setCurrentScan] = useState('');
  const [uptime, setUptime] = useState('00:15:32');

  // Simulate battery drain
  useEffect(() => {
    if (roverStatus === 'Scanning' || roverStatus === 'Moving') {
      const interval = setInterval(() => {
        setBatteryLevel(prev => Math.max(0, prev - 0.1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [roverStatus]);

  // Simulate scanning activity
  useEffect(() => {
    if (roverStatus === 'Scanning') {
      const items = [
        'Box #A-1234',
        'Pallet #B-5678',
        'Container #C-9012',
        'Shelf Unit #D-3456',
        'Crate #E-7890'
      ];
      const interval = setInterval(() => {
        setCurrentScan(items[Math.floor(Math.random() * items.length)]);
        setScannedItems(prev => prev + 1);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [roverStatus]);

  const handleCommand = (command) => {
    switch(command) {
      case 'start':
        setRoverStatus('Scanning');
        break;
      case 'pause':
        setRoverStatus('Paused');
        break;
      case 'terminate':
        setRoverStatus('Idle');
        setCurrentScan('');
        break;
      case 'return':
        setRoverStatus('Returning to Base');
        setCurrentScan('');
        break;
    }
  };

  const getStatusColor = () => {
    switch(roverStatus) {
      case 'Scanning': return 'text-green-500';
      case 'Paused': return 'text-yellow-500';
      case 'Returning to Base': return 'text-blue-500';
      case 'Idle': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getBatteryColor = () => {
    if (batteryLevel > 50) return 'text-green-500';
    if (batteryLevel > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">ROS 2 Rover Control Center</h1>
          <p className="text-gray-400">Inventory Scanning & Logging System</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Command Control Panel */}
          <div className="lg:col-span-1 bg-gray-800 rounded-lg p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Activity className="mr-2" size={24} />
              Command Controls
            </h2>
            
            <div className="space-y-3">
              <button
                onClick={() => handleCommand('start')}
                disabled={roverStatus === 'Scanning'}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-all"
              >
                <Power className="mr-2" size={20} />
                Start Scan
              </button>
              
              <button
                onClick={() => handleCommand('pause')}
                disabled={roverStatus !== 'Scanning'}
                className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-all"
              >
                <Pause className="mr-2" size={20} />
                Pause
              </button>
              
              <button
                onClick={() => handleCommand('terminate')}
                disabled={roverStatus === 'Idle'}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-all"
              >
                <XCircle className="mr-2" size={20} />
                Terminate
              </button>
              
              <button
                onClick={() => handleCommand('return')}
                disabled={roverStatus === 'Idle' || roverStatus === 'Returning to Base'}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-all"
              >
                <Home className="mr-2" size={20} />
                Return to Base
              </button>
            </div>
          </div>

          {/* Status & Telemetry */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Status Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-800 rounded-lg p-4 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <Activity size={20} className="text-blue-400" />
                  <span className="text-xs text-gray-400">STATUS</span>
                </div>
                <p className={`text-lg font-bold ${getStatusColor()}`}>{roverStatus}</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <Battery size={20} className={getBatteryColor()} />
                  <span className="text-xs text-gray-400">BATTERY</span>
                </div>
                <p className={`text-lg font-bold ${getBatteryColor()}`}>{batteryLevel.toFixed(1)}%</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <Wifi size={20} className="text-green-400" />
                  <span className="text-xs text-gray-400">CONNECTION</span>
                </div>
                <p className="text-lg font-bold text-green-500">{connectionStatus}</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <Package size={20} className="text-purple-400" />
                  <span className="text-xs text-gray-400">SCANNED</span>
                </div>
                <p className="text-lg font-bold text-purple-400">{scannedItems} items</p>
              </div>
            </div>

            {/* Live Camera Feed */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Camera className="mr-2" size={24} />
                Live Camera Feed
              </h2>
              <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center border-2 border-gray-700">
                {roverStatus === 'Idle' ? (
                  <div className="text-center text-gray-500">
                    <Camera size={64} className="mx-auto mb-4 opacity-50" />
                    <p>Camera feed inactive</p>
                    <p className="text-sm">Start scan to view live feed</p>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-900 opacity-50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-pulse mb-4">
                          <Camera size={64} className="mx-auto text-blue-400" />
                        </div>
                        <p className="text-blue-400 font-semibold">LIVE FEED ACTIVE</p>
                        {currentScan && (
                          <div className="mt-4 bg-black bg-opacity-50 px-4 py-2 rounded">
                            <p className="text-green-400 text-sm">Currently Scanning:</p>
                            <p className="text-white font-bold">{currentScan}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                      REC
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Scans Log */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Package className="mr-2" size={24} />
            Recent Inventory Scans
          </h2>
          <div className="space-y-2">
            {[
              { id: 'INV-2024-001', item: 'Pallet #B-5678', time: '2 min ago', status: 'synced' },
              { id: 'INV-2024-002', item: 'Box #A-1234', time: '5 min ago', status: 'synced' },
              { id: 'INV-2024-003', item: 'Container #C-9012', time: '8 min ago', status: 'synced' },
              { id: 'INV-2024-004', item: 'Shelf Unit #D-3456', time: '12 min ago', status: 'synced' },
              { id: 'INV-2024-005', item: 'Crate #E-7890', time: '15 min ago', status: 'synced' },
            ].map((scan, idx) => (
              <div key={idx} className="bg-gray-900 p-4 rounded flex items-center justify-between hover:bg-gray-700 transition-all">
                <div className="flex items-center space-x-4">
                  <Package size={20} className="text-blue-400" />
                  <div>
                    <p className="font-semibold">{scan.item}</p>
                    <p className="text-sm text-gray-400">{scan.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-400">{scan.time}</span>
                  <CheckCircle size={20} className="text-green-500" />
                  <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">
                    DB Synced
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>ROS 2 Rover Dashboard v1.0 | Uptime: {uptime} | System Status: Operational</p>
        </div>
      </div>
    </div>
  );
}