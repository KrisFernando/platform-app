// src/components/dashboard/WidgetPanel.tsx
"use client"
import React from 'react';
import { X } from 'lucide-react';
import { Widget } from '@/types/dashboard';
import { WidgetPreview } from './WidgetPreview';

interface WidgetPanelProps {
  onClose: () => void;
  onAddWidget: (widget: Widget) => void;
}

const availableWidgets: Widget[] = [
  // Business Metrics
  { id: 'metric1', type: 'metric', title: 'Total Revenue', value: '$2.4M', col: 0 },
  { id: 'metric2', type: 'metric', title: 'Active Users', value: '12,521', col: 0 },
  { id: 'metric3', type: 'metric', title: 'Conversion Rate', value: '3.2%', col: 0 },
  { id: 'metric4', type: 'metric', title: 'Avg Order Value', value: '$156', col: 0 },
  { id: 'metric5', type: 'metric', title: 'Customer LTV', value: '$890', col: 0 },
  { id: 'metric6', type: 'metric', title: 'Churn Rate', value: '1.2%', col: 0 },
  { id: 'metric7', type: 'metric', title: 'Net Promoter Score', value: '72', col: 0 },
  { id: 'metric8', type: 'metric', title: 'Support Tickets', value: '156', col: 0 },
  
  // Bar Charts
  { id: 'bar1', type: 'barChart', title: 'Monthly Sales', col: 0 },
  { id: 'bar2', type: 'barChart', title: 'Revenue by Product', col: 0 },
  { id: 'bar3', type: 'barChart', title: 'Customer Acquisition', col: 0 },
  
  // Line Charts
  { id: 'line1', type: 'lineChart', title: 'User Growth', col: 0 },
  { id: 'line2', type: 'lineChart', title: 'Monthly Recurring Revenue', col: 0 },
  { id: 'line3', type: 'lineChart', title: 'Customer Engagement', col: 0 },
  
  // Pie Charts
  { id: 'pie1', type: 'pieChart', title: 'Revenue by Region', col: 0 },
  { id: 'pie2', type: 'pieChart', title: 'Traffic Sources', col: 0 },
  { id: 'pie3', type: 'pieChart', title: 'User Demographics', col: 0 }
];

export const WidgetPanel: React.FC<WidgetPanelProps> = ({ onClose, onAddWidget }) => {
  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform overflow-y-auto">
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Add Widgets</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {availableWidgets.map(widget => (
          <div
            key={widget.id}
            className="cursor-move hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50 rounded-lg transition-all duration-200"
          >
            <WidgetPreview widget={widget} onAdd={onAddWidget} />
          </div>
        ))}
      </div>
    </div>
  );
};