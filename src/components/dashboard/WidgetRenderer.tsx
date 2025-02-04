// src/components/dashboard/WidgetRenderer.tsx
"use client"
import React from 'react';
import { Widget } from '@/types/dashboard';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Camera, Github, Plus, X, GripHorizontal, Pencil, Save } from 'lucide-react';
import { getChartData } from '@/utils/chartData';

interface WidgetRendererProps {
  widget: Widget;
  isEditMode: boolean;
  onRemove?: (widgetId: string) => void;
}

export const WidgetRenderer: React.FC<WidgetRendererProps> = ({
  widget,
  isEditMode,
  onRemove
}) => {
  switch (widget.type) {
    case 'metric':
      return (
        <div className="bg-white p-6 rounded-lg shadow-sm relative">
          {isEditMode && onRemove && (
            <button
              onClick={() => onRemove(widget.id)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
            </button>
          )}
          <h3 className="text-lg font-semibold text-gray-900">{widget.title}</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{widget.value}</p>
        </div>
      );
    case 'barChart':
      return (
        <div className="bg-white p-6 rounded-lg shadow-sm relative">
          {isEditMode && onRemove && (
            <button
              onClick={() => onRemove(widget.id)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
            </button>
          )}
          <h3 className="text-lg font-semibold text-gray-900">{widget.title}</h3>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getChartData(widget.title)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    case 'lineChart':
      return (
        <div className="bg-white p-6 rounded-lg shadow-sm relative">
          {isEditMode && onRemove && (
            <button
              onClick={() => onRemove(widget.id)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
            </button>
          )}
          <h3 className="text-lg font-semibold text-gray-900">{widget.title}</h3>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getChartData(widget.title)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    case 'pieChart':
      return (
        <div className="bg-white p-6 rounded-lg shadow-sm relative">
          {isEditMode && onRemove && (
            <button
              onClick={() => onRemove(widget.id)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
            </button>
          )}
          <h3 className="text-lg font-semibold text-gray-900">{widget.title}</h3>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getChartData(widget.title)}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  label
                >
                  {getChartData(widget.title).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
    default:
      return null;
  }
};