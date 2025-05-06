
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { categorySpending } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SpendingChart = () => {
  // Make the chart adjust based on screen size
  const getChartDimensions = () => {
    // Use window.innerWidth if needed for more precise control
    return {
      outerRadius: window.innerWidth < 768 ? 80 : 120,
      labelOffset: window.innerWidth < 768 ? 10 : 20,
    };
  };

  const { outerRadius, labelOffset } = getChartDimensions();

  // Custom label rendering function to improve readability
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    // Only show labels for segments with enough percentage
    if (percent < 0.05) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill="#000000" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="h-[400px] animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Spending by Category</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categorySpending}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={outerRadius}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={renderCustomizedLabel}
              >
                {categorySpending.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
                contentStyle={{ background: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: "10px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;
