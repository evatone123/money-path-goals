
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { categorySpending } from '@/lib/data';

const SpendingChart = () => {
  return (
    <div className="budget-card h-[400px] animate-fade-in">
      <h3 className="font-medium text-lg mb-4">Spending by Category</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={categorySpending}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {categorySpending.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
