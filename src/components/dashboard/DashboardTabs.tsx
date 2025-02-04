// src/components/dashboard/DashboardTabs.tsx
"use client"
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Dashboard } from '@/types/dashboard';

interface DashboardTabsProps {
    dashboards: Dashboard[];
    activeDashboardId: string;
    isEditMode: boolean;
    onDashboardChange: (dashboardId: string) => void;
    onDashboardAdd: (name: string) => void;
    onDashboardDelete: (dashboardId: string) => void;
}

export const DashboardTabs: React.FC<DashboardTabsProps> = ({
    dashboards,
    activeDashboardId,
    isEditMode,
    onDashboardChange,
    onDashboardAdd,
    onDashboardDelete,
}) => {
    const [isAddingDashboard, setIsAddingDashboard] = useState(false);
    const [newDashboardName, setNewDashboardName] = useState('');

    const handleAddDashboard = () => {
        if (newDashboardName.trim()) {
            onDashboardAdd(newDashboardName.trim());
            setNewDashboardName('');
            setIsAddingDashboard(false);
        }
    };

    return (
        <div className="mb-6 border-b border-gray-200">
            <div className="flex items-center">
                <div className="flex-1 flex items-center space-x-4 overflow-x-auto">
                    {dashboards.map(dashboard => (
                        <div key={dashboard.id} className="relative group">
                            <button
                                onClick={() => onDashboardChange(dashboard.id)}
                                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeDashboardId === dashboard.id
                                        ? 'text-blue-600 bg-white border-t border-x border-gray-200'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    {dashboard.name}
                                    {isEditMode && dashboards.length > 1 && (
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDashboardDelete(dashboard.id);
                                            }}
                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </div>
                                    )}
                                </span>
                            </button>
                        </div>
                    ))}
                </div>

                {isEditMode && (
                    isAddingDashboard ? (
                        <div className="flex items-center gap-2 px-4">
                            <input
                                type="text"
                                value={newDashboardName}
                                onChange={(e) => setNewDashboardName(e.target.value)}
                                placeholder="Dashboard name"
                                className="px-2 py-1 border rounded-md text-sm"
                                autoFocus
                                onKeyPress={(e) => e.key === 'Enter' && handleAddDashboard()}
                            />
                            <button
                                onClick={handleAddDashboard}
                                className="text-green-600 hover:text-green-700"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => {
                                    setIsAddingDashboard(false);
                                    setNewDashboardName('');
                                }}
                                className="text-gray-600 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsAddingDashboard(true)}
                            className="p-1 ml-4 text-gray-600 hover:text-gray-800"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    )
                )}
            </div>
        </div>
    );
};
