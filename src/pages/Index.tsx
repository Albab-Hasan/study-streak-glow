
import React from 'react';
import { templateData } from '@/data/templateData';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Study Streak</h1>
        <p className="text-xl text-gray-600 mb-8 text-center">
          Choose a template to get started with your study habits
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templateData.map((template) => (
            <div 
              key={template.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-2">{template.name}</h2>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {template.category}
                </span>
                <span className="text-sm text-gray-500">
                  {template.habits.length} habits
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
