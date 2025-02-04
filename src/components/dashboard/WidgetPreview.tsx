//src/components/dashboard/WidgetPreview.tsx
"use client"
import React from 'react';
import { Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Widget } from '@/types/dashboard';
import { getChartData } from '@/utils/chartData';

interface WidgetPreviewProps {
  widget: Widget;
  onAdd: (widget: Widget) => void;
}

export const WidgetPreview: React.FC<WidgetPreviewProps> = ({ widget, onAdd }) => {
  const previewHeight = "100px";
  
  const PreviewWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="relative p-2 bg-white rounded-lg shadow-sm group">
      <button
        onClick={() => onAdd({ ...widget, isNew: true })}
        className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600 z-10"
      >
        <Plus className="w-4 h-4" />
      </button>
      {children}
    </div>
  );

  switch (widget.type) {
    case 'metric':
      return (
        <PreviewWrapper>
          <h4 className="text-sm font-medium text-gray-700 truncate pr-6">{widget.title}</h4>
          <p className="text-lg font-bold text-gray-900">{widget.value}</p>
        </PreviewWrapper>
      );
    case 'barChart':
      return (
        <PreviewWrapper>
          <h4 className="text-sm font-medium text-gray-700 truncate mb-1 pr-6">{widget.title}</h4>
          <div style={{ height: previewHeight }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getChartData(widget.title).slice(0, 4)}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PreviewWrapper>
      );
    // ... Add other chart type cases (lineChart, pieChart)
    default:
      return null;
  }
};