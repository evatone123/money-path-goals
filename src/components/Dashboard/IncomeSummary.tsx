import { useState } from "react";
import { incomeSources } from "@/lib/data";

const IncomeSummary = () => {
  const [sources] = useState(incomeSources);
  
  const totalIncome = sources.reduce((sum, source) => sum + source.amount, 0);
  
  return (
    <div className="budget-card animate-fade-in">
      <h3 className="font-medium text-lg mb-4">Income Sources</h3>
      <div className="space-y-4">
        {sources.map((source) => (
          <div key={source.id} className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{source.name}</p>
              <p className="text-xs text-gray-500">{source.frequency}</p>
            </div>
            <span className="font-medium text-budget-green">
              ${source.amount.toFixed(2)}
            </span>
          </div>
        ))}
        
        <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
          <span className="font-medium">Total Monthly</span>
          <span className="font-bold text-budget-green">${totalIncome.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default IncomeSummary;
