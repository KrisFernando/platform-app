// src/types/dashboard.ts
export interface Widget {
    id: string;
    type: 'metric' | 'barChart' | 'lineChart' | 'pieChart';
    title: string;
    value?: string;
    col: number;
  }
  
  export interface Dashboard {
    id: string;
    name: string;
    widgets: Widget[];
  }
  
  export interface ChartData {
    name: string;
    value: number;
  }
  
  export type DashboardUser = {
    name: string;
    email?: string;
    avatar?: string;
  } | null;