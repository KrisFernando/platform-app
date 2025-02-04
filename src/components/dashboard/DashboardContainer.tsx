// src/components/dashboard/DashboardContainer.tsx
"use client"
import React, { useState } from 'react';
import { Pencil, Plus, Save } from 'lucide-react';
import { Dashboard as DashboardType, DashboardUser, Widget } from '@/types/dashboard';
import { Login } from './Login';
import { Profile } from './Profile';
import { Dashboard } from './Dashboard';
import { DashboardTabs } from './DashboardTabs';
import { WidgetPanel } from './WidgetPanel';

const INITIAL_DASHBOARDS: DashboardType[] = [
    {
        id: '1',
        name: 'Main Dashboard',
        widgets: [
            { id: '1', type: 'metric', title: 'Monthly Revenue', value: '$50,000', col: 1 },
            { id: '2', type: 'metric', title: 'Active Users', value: '1,234', col: 2 },
            { id: '3', type: 'metric', title: 'Customer Satisfaction', value: '4.8/5', col: 3 },
            { id: '4', type: 'barChart', title: 'Revenue Trend', col: 1 },
            { id: '5', type: 'lineChart', title: 'User Growth', col: 2 }
        ]
    },
    {
        id: '2',
        name: 'Sales Overview',
        widgets: [
            { id: '6', type: 'pieChart', title: 'Revenue by Region', col: 1 },
            { id: '7', type: 'metric', title: 'Total Sales', value: '$75,000', col: 2 }
        ]
    }
];

export const DashboardContainer: React.FC = () => {
    const [activeView, setActiveView] = useState<'dashboard' | 'profile'>('dashboard');
    const [user, setUser] = useState<DashboardUser>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showWidgetPanel, setShowWidgetPanel] = useState(false);
    const [dashboards, setDashboards] = useState<DashboardType[]>(INITIAL_DASHBOARDS);
    const [activeDashboardId, setActiveDashboardId] = useState(INITIAL_DASHBOARDS[0].id);

    const currentDashboard = dashboards.find(d => d.id === activeDashboardId) || dashboards[0];

    const updateDashboardWidgets = (newWidgets: Widget[]) => {
        setDashboards(dashboards.map(dashboard =>
            dashboard.id === activeDashboardId
                ? { ...dashboard, widgets: newWidgets }
                : dashboard
        ));
    };

    const addDashboard = (name: string) => {
        const newDashboard: DashboardType = {
            id: Date.now().toString(),
            name,
            widgets: []
        };
        setDashboards([...dashboards, newDashboard]);
        setActiveDashboardId(newDashboard.id);
    };

    const deleteDashboard = (dashboardId: string) => {
        if (dashboards.length > 1) {
            const newDashboards = dashboards.filter(d => d.id !== dashboardId);
            setDashboards(newDashboards);
            if (dashboardId === activeDashboardId) {
                setActiveDashboardId(newDashboards[0].id);
            }
        }
    };

    if (!user) {
        return <Login onLogin={setUser} />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-xl font-bold text-gray-900">Demo App</span>
                            </div>
                            <div className="ml-6 flex space-x-8">
                                <button
                                    onClick={() => setActiveView('dashboard')}
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${activeView === 'dashboard'
                                            ? 'border-blue-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => setActiveView('profile')}
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${activeView === 'profile'
                                            ? 'border-blue-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Profile
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={() => setUser(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 px-4">
                {activeView === 'dashboard' ? (
                    <>
                        <DashboardTabs
                            dashboards={dashboards}
                            activeDashboardId={activeDashboardId}
                            isEditMode={isEditMode}
                            onDashboardChange={setActiveDashboardId}
                            onDashboardAdd={addDashboard}
                            onDashboardDelete={deleteDashboard}
                        />
                        <div className="relative">
                            <Dashboard
                                currentDashboard={currentDashboard}
                                isEditMode={isEditMode}
                                onUpdateWidgets={updateDashboardWidgets}
                            />

                            {/* Edit Mode Controls */}
                            <div className="fixed bottom-6 right-6 flex flex-col gap-2">
                                {isEditMode && (
                                    <button
                                        onClick={() => {
                                            setIsEditMode(false);
                                            setShowWidgetPanel(false);
                                        }}
                                        className="bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600"
                                    >
                                        <Save className="w-6 h-6" />
                                    </button>
                                )}

                                <button
                                    onClick={() => {
                                        if (!isEditMode) {
                                            setIsEditMode(true);
                                        } else {
                                            setShowWidgetPanel(true);
                                        }
                                    }}
                                    className="bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600"
                                >
                                    {isEditMode ? <Plus className="w-6 h-6" /> : <Pencil className="w-6 h-6" />}
                                </button>
                            </div>

                            {/* Edit Mode Indicator */}
                            {isEditMode && (
                                <div className="fixed top-20 right-6 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md shadow-sm">
                                    Edit Mode Active
                                </div>
                            )}

                            {/* Widget Panel */}
                            {showWidgetPanel && isEditMode && (
                                <WidgetPanel
                                    onClose={() => setShowWidgetPanel(false)}
                                    onAddWidget={(widget) => {
                                        const newWidget = {
                                            ...widget,
                                            id: `${widget.id}-${Date.now()}`,
                                            col: (currentDashboard.widgets.length % 3) + 1
                                        };
                                        updateDashboardWidgets([...currentDashboard.widgets, newWidget]);
                                    }}
                                />
                            )}
                        </div>
                    </>
                ) : (
                    <Profile />
                )}
            </main>
        </div>
    );
};

// Export the component as default from the file
export default DashboardContainer;