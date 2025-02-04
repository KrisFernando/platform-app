"use client"
import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Camera, Github, Plus, X, GripHorizontal, Pencil, Save } from 'lucide-react';

const DashboardPreview = () => {
    const [activeView, setActiveView] = useState('dashboard');
    const [user, setUser] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showWidgetPanel, setShowWidgetPanel] = useState(false);
    const [draggingWidget, setDraggingWidget] = useState(null);
    
    // Dashboard management
    const [dashboards, setDashboards] = useState([
      { id: '1', name: 'Main Dashboard', widgets: [
        { id: '1', type: 'metric', title: 'Monthly Revenue', value: '$50,000', col: 1 },
        { id: '2', type: 'metric', title: 'Active Users', value: '1,234', col: 2 },
        { id: '3', type: 'metric', title: 'Customer Satisfaction', value: '4.8/5', col: 3 },
        { id: '4', type: 'barChart', title: 'Revenue Trend', col: 1 },
        { id: '5', type: 'lineChart', title: 'User Growth', col: 2 }
      ]},
      { id: '2', name: 'Sales Overview', widgets: [
        { id: '6', type: 'pieChart', title: 'Revenue by Region', col: 1 },
        { id: '7', type: 'metric', title: 'Total Sales', value: '$75,000', col: 2 }
      ]},
    ]);
    const [activeDashboardId, setActiveDashboardId] = useState('1');
    const [isAddingDashboard, setIsAddingDashboard] = useState(false);
    const [newDashboardName, setNewDashboardName] = useState('');
  
    // Get current dashboard's widgets
    const currentDashboard = dashboards.find(d => d.id === activeDashboardId);
    const widgets = currentDashboard ? currentDashboard.widgets : [];
  
    const updateDashboardWidgets = (newWidgets) => {
      setDashboards(dashboards.map(dashboard => 
        dashboard.id === activeDashboardId
          ? { ...dashboard, widgets: newWidgets }
          : dashboard
      ));
    };
  
    const addNewDashboard = () => {
      if (newDashboardName.trim()) {
        const newDashboard = {
          id: Date.now().toString(),
          name: newDashboardName.trim(),
          widgets: []
        };
        setDashboards([...dashboards, newDashboard]);
        setActiveDashboardId(newDashboard.id);
        setNewDashboardName('');
        setIsAddingDashboard(false);
      }
    };
  
    const deleteDashboard = (dashboardId) => {
      if (dashboards.length > 1) {
        const newDashboards = dashboards.filter(d => d.id !== dashboardId);
        setDashboards(newDashboards);
        if (dashboardId === activeDashboardId) {
          setActiveDashboardId(newDashboards[0].id);
        }
      }
    };
  
    const DashboardTabs = () => (
      <div className="mb-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-1 flex items-center space-x-4 overflow-x-auto">
            {dashboards.map(dashboard => (
              <div key={dashboard.id} className="relative group">
                <button
                  onClick={() => setActiveDashboardId(dashboard.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative ${
                    activeDashboardId === dashboard.id
                      ? 'text-blue-600 bg-white border-t border-x border-gray-200'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {dashboard.name}
                    {isEditMode && dashboards.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteDashboard(dashboard.id);
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
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
                  onKeyPress={(e) => e.key === 'Enter' && addNewDashboard()}
                />
                <button
                  onClick={addNewDashboard}
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
  
    const getChartData = (widgetTitle) => {
      switch (widgetTitle) {
        case 'Monthly Sales':
          return [
            { name: 'Jan', value: 44000 },
            { name: 'Feb', value: 53000 },
            { name: 'Mar', value: 62000 },
            { name: 'Apr', value: 58780 },
            { name: 'May', value: 71890 },
            { name: 'Jun', value: 82390 },
          ];
        case 'Revenue by Product':
          return [
            { name: 'Product A', value: 25000 },
            { name: 'Product B', value: 35000 },
            { name: 'Product C', value: 45000 },
            { name: 'Product D', value: 30000 },
            { name: 'Product E', value: 28000 },
          ];
        case 'Customer Acquisition':
          return [
            { name: 'Q1', value: 1200 },
            { name: 'Q2', value: 1800 },
            { name: 'Q3', value: 2200 },
            { name: 'Q4', value: 2800 },
          ];
        case 'User Growth':
          return [
            { name: 'Jan', value: 10000 },
            { name: 'Feb', value: 12000 },
            { name: 'Mar', value: 15000 },
            { name: 'Apr', value: 18000 },
            { name: 'May', value: 22000 },
            { name: 'Jun', value: 28000 },
          ];
        case 'Monthly Recurring Revenue':
          return [
            { name: 'Jan', value: 150000 },
            { name: 'Feb', value: 165000 },
            { name: 'Mar', value: 185000 },
            { name: 'Apr', value: 190000 },
            { name: 'May', value: 210000 },
            { name: 'Jun', value: 250000 },
          ];
        case 'Customer Engagement':
          return [
            { name: 'Week 1', value: 85 },
            { name: 'Week 2', value: 88 },
            { name: 'Week 3', value: 92 },
            { name: 'Week 4', value: 89 },
            { name: 'Week 5', value: 95 },
            { name: 'Week 6', value: 93 },
          ];
        case 'Revenue by Region':
          return [
            { name: 'North', value: 350000 },
            { name: 'South', value: 280000 },
            { name: 'East', value: 420000 },
            { name: 'West', value: 380000 },
          ];
        case 'Traffic Sources':
          return [
            { name: 'Organic', value: 45 },
            { name: 'Direct', value: 25 },
            { name: 'Social', value: 20 },
            { name: 'Referral', value: 10 },
          ];
        case 'User Demographics':
          return [
            { name: '18-24', value: 25 },
            { name: '25-34', value: 35 },
            { name: '35-44', value: 20 },
            { name: '45+', value: 20 },
          ];
        default:
          return [
            { name: 'Jan', value: 4000 },
            { name: 'Feb', value: 3000 },
            { name: 'Mar', value: 2000 },
            { name: 'Apr', value: 2780 },
            { name: 'May', value: 1890 },
            { name: 'Jun', value: 2390 },
          ];
      }
    };
  
    const availableWidgets = [
      // Business Metrics
      { id: 'metric1', type: 'metric', title: 'Total Revenue', value: '$2.4M' },
      { id: 'metric2', type: 'metric', title: 'Active Users', value: '12,521' },
      { id: 'metric3', type: 'metric', title: 'Conversion Rate', value: '3.2%' },
      { id: 'metric4', type: 'metric', title: 'Avg Order Value', value: '$156' },
      { id: 'metric5', type: 'metric', title: 'Customer LTV', value: '$890' },
      { id: 'metric6', type: 'metric', title: 'Churn Rate', value: '1.2%' },
      { id: 'metric7', type: 'metric', title: 'Net Promoter Score', value: '72' },
      { id: 'metric8', type: 'metric', title: 'Support Tickets', value: '156' },
      
      // Bar Charts
      { id: 'bar1', type: 'barChart', title: 'Monthly Sales' },
      { id: 'bar2', type: 'barChart', title: 'Revenue by Product' },
      { id: 'bar3', type: 'barChart', title: 'Customer Acquisition' },
      
      // Line Charts
      { id: 'line1', type: 'lineChart', title: 'User Growth' },
      { id: 'line2', type: 'lineChart', title: 'Monthly Recurring Revenue' },
      { id: 'line3', type: 'lineChart', title: 'Customer Engagement' },
      
      // Pie Charts
      { id: 'pie1', type: 'pieChart', title: 'Revenue by Region' },
      { id: 'pie2', type: 'pieChart', title: 'Traffic Sources' },
      { id: 'pie3', type: 'pieChart', title: 'User Demographics' }
    ];
  
    const handleDragStart = (e, widget) => {
      if (!isEditMode) return;
      setDraggingWidget(widget);
      e.dataTransfer.setData('text/plain', ''); // Required for Firefox
      // Add visual feedback
      e.target.classList.add('opacity-50');
    };
  
    const handleDragEnd = (e) => {
      // Remove visual feedback
      e.target.classList.remove('opacity-50');
    };
  
    const handleDragOver = (e) => {
      if (!isEditMode) return;
      e.preventDefault();
      e.currentTarget.classList.add('border-opacity-100');
    };
  
    const handleDragLeave = (e) => {
      e.currentTarget.classList.remove('border-opacity-100');
    };
  
    const handleDrop = (e, targetCol) => {
      if (!isEditMode) return;
      e.preventDefault();
      e.currentTarget.classList.remove('border-opacity-100');
      
      if (!draggingWidget) return;
  
      const newId = `${draggingWidget.id}-${Date.now()}`;
      if (draggingWidget.isNew) {
        setWidgets([...widgets, { ...draggingWidget, id: newId, col: targetCol }]);
      } else {
        setWidgets(widgets.map(w => 
          w.id === draggingWidget.id ? { ...w, col: targetCol } : w
        ));
      }
      setDraggingWidget(null);
    };
  
    const removeWidget = (widgetId) => {
      setWidgets(widgets.filter(w => w.id !== widgetId));
    };
  
    const addWidget = (widget) => {
      const newId = `${widget.id}-${Date.now()}`;
      // Find the column with the least number of widgets
      const columnCounts = [1, 2, 3].map(col => 
        widgets.filter(w => w.col === col).length
      );
      const targetColumn = columnCounts.indexOf(Math.min(...columnCounts)) + 1;
      
      setWidgets([...widgets, { ...widget, id: newId, col: targetColumn }]);
    };
  
    const WidgetPreview = ({ widget }) => {
      const previewHeight = "100px";
      
      const PreviewWrapper = ({ children }) => (
        <div className="relative p-2 bg-white rounded-lg shadow-sm group">
          <button
            onClick={() => addWidget({ ...widget, isNew: true })}
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
        case 'lineChart':
          return (
            <PreviewWrapper>
              <h4 className="text-sm font-medium text-gray-700 truncate mb-1 pr-6">{widget.title}</h4>
              <div style={{ height: previewHeight }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getChartData(widget.title).slice(0, 4)}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </PreviewWrapper>
          );
        case 'pieChart':
          return (
            <PreviewWrapper>
              <h4 className="text-sm font-medium text-gray-700 truncate mb-1 pr-6">{widget.title}</h4>
              <div style={{ height: previewHeight }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getChartData(widget.title).slice(0, 4)}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={30}
                    >
                      {getChartData(widget.title).slice(0, 4).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </PreviewWrapper>
          );
        default:
          return null;
      }
    };
  
    const WidgetPanel = () => (
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 z-10">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Add Widgets</h3>
            <button onClick={() => setShowWidgetPanel(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {availableWidgets.map(widget => (
            <div
              key={widget.id}
              draggable
              onDragStart={(e) => handleDragStart(e, { ...widget, isNew: true })}
              className="cursor-move hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50 rounded-lg transition-all duration-200"
            >
              <WidgetPreview widget={widget} />
            </div>
          ))}
        </div>
      </div>
    );
  
    const renderWidget = (widget) => {
      switch (widget.type) {
        case 'metric':
          return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">{widget.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{widget.value}</p>
            </div>
          );
        case 'barChart':
          return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
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
            <div className="bg-white p-6 rounded-lg shadow-sm">
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
            <div className="bg-white p-6 rounded-lg shadow-sm">
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
                      fill="#3b82f6"
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
  
    const Dashboard = () => (
      <div className="relative">
        {/* Edit Mode Toggle Button */}
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
  
        {showWidgetPanel && isEditMode && <WidgetPanel />}
  
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map(colNum => (
            <div
              key={colNum}
              onDragOver={(e) => isEditMode && handleDragOver(e)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => isEditMode && handleDrop(e, colNum)}
              className={`space-y-6 min-h-[100px] ${isEditMode ? 'border-2 border-dashed border-gray-200 border-opacity-0 hover:border-opacity-100 transition-all duration-200' : ''}`}
            >
              {widgets
                .filter(widget => widget.col === colNum)
                .map(widget => (
                  <div
                    key={widget.id}
                    draggable={isEditMode}
                    onDragStart={(e) => isEditMode && handleDragStart(e, widget)}
                    onDragEnd={handleDragEnd}
                    className={`relative group ${isEditMode ? 'cursor-move hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50 transition-all duration-200' : ''}`}
                  >
                    {isEditMode && (
                      <button
                        onClick={() => removeWidget(widget.id)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                      </button>
                    )}
                    {renderWidget(widget)}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    );
  
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
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      activeView === 'dashboard'
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setActiveView('profile')}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      activeView === 'profile'
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
              <DashboardTabs />
              <Dashboard />
            </>
          ) : (
            <Profile />
          )}
        </main>
      </div>
    );
  };
  
  export default DashboardPreview;