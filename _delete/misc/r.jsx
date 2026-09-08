import React, { useState } from 'react';
import { Monitor, Smartphone, Server } from 'lucide-react';

export default function OperatingSystems() {
  const [selectedOS, setSelectedOS] = useState(null);

  const operatingSystems = [
    {
      id: 1,
      name: 'Windows',
      icon: <Monitor className="w-12 h-12" />,
      color: 'bg-blue-500',
      description: 'Popular OS for personal computers',
      features: ['User-friendly interface', 'Wide software support', 'Gaming compatible']
    },
    {
      id: 2,
      name: 'macOS',
      icon: <Monitor className="w-12 h-12" />,
      color: 'bg-gray-700',
      description: 'Apple\'s operating system',
      features: ['Sleek design', 'Great for creative work', 'Seamless Apple integration']
    },
    {
      id: 3,
      name: 'Linux',
      icon: <Server className="w-12 h-12" />,
      color: 'bg-yellow-500',
      description: 'Open-source and customizable',
      features: ['Free and open-source', 'Highly customizable', 'Secure and stable']
    },
    {
      id: 4,
      name: 'Android',
      icon: <Smartphone className="w-12 h-12" />,
      color: 'bg-green-500',
      description: 'Mobile operating system',
      features: ['Most popular mobile OS', 'Google services', 'Customizable']
    },
    {
      id: 5,
      name: 'iOS',
      icon: <Smartphone className="w-12 h-12" />,
      color: 'bg-gray-800',
      description: 'Apple\'s mobile OS',
      features: ['Smooth performance', 'Strong security', 'App Store ecosystem']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Operating Systems
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Click on any OS to learn more
        </p>

        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <img 
            src="https://images.pexels.com/photos/6963098/pexels-photo-6963098.jpeg?auto=compress&cs=tinysrgb&w=1200" 
            alt="Operating System Interface"
            className="w-full h-64 object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {operatingSystems.map((os) => (
            <div
              key={os.id}
              onClick={() => setSelectedOS(os)}
              className={`${os.color} text-white rounded-lg p-6 cursor-pointer transform transition-all hover:scale-105 shadow-lg`}
            >
              <div className="flex flex-col items-center">
                {os.icon}
                <h3 className="text-2xl font-bold mt-4">{os.name}</h3>
                <p className="text-sm mt-2 text-center opacity-90">{os.description}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedOS && (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{selectedOS.name}</h2>
            <p className="text-gray-600 mb-4">{selectedOS.description}</p>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Key Features:</h3>
            <ul className="space-y-2">
              {selectedOS.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}