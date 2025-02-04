// src/components/dashboard/Dashboard.tsx
"use client"
import React from 'react';
import { Widget, Dashboard } from '@/types/dashboard';
import { DashboardGrid } from './DashboardGrid';
import { DashboardTabs } from './DashboardTabs';

interface DashboardProps {
  currentDashboard: Dashboard;
  isEditMode: boolean;
  onUpdateWidgets: (widgets: Widget[]) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentDashboard,
  isEditMode,
  onUpdateWidgets,
}) => {
  return (
    <div className="relative">
      <DashboardGrid
        widgets={currentDashboard.widgets}
        isEditMode={isEditMode}
        onUpdateWidgets={onUpdateWidgets}
      />
    </div>
  );
};

