// src/components/dashboard/DashboardGrid.tsx
"use client"
import React, { useState } from 'react';
import { Widget } from '@/types/dashboard';
import { WidgetRenderer } from './WidgetRenderer';

interface DashboardGridProps {
  widgets: Widget[];
  isEditMode: boolean;
  onUpdateWidgets: (widgets: Widget[]) => void;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({
  widgets,
  isEditMode,
  onUpdateWidgets,
}) => {
  const [draggingWidget, setDraggingWidget] = useState<Widget | null>(null);

  const handleDragStart = (e: React.DragEvent, widget: Widget) => {
    if (!isEditMode) return;
    setDraggingWidget(widget);
    e.dataTransfer.setData('text/plain', '');
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDrop = (e: React.DragEvent, targetCol: number) => {
    if (!isEditMode || !draggingWidget) return;
    e.preventDefault();
    
    const newWidgets = draggingWidget.isNew
      ? [...widgets, { ...draggingWidget, col: targetCol }]
      : widgets.map(w => w.id === draggingWidget.id ? { ...w, col: targetCol } : w);
    
    onUpdateWidgets(newWidgets);
    setDraggingWidget(null);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {[1, 2, 3].map(colNum => (
        <div
          key={colNum}
          onDragOver={(e) => isEditMode && e.preventDefault()}
          onDrop={(e) => handleDrop(e, colNum)}
          className={`space-y-6 min-h-[100px] ${
            isEditMode ? 'border-2 border-dashed border-gray-200 border-opacity-0 hover:border-opacity-100' : ''
          }`}
        >
          {widgets
            .filter(widget => widget.col === colNum)
            .map(widget => (
              <div
                key={widget.id}
                draggable={isEditMode}
                onDragStart={(e) => handleDragStart(e, widget)}
                className={`relative group ${isEditMode ? 'cursor-move hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50' : ''}`}
              >
                <WidgetRenderer widget={widget} isEditMode={isEditMode} />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};
