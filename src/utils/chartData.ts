// src/utils/chartData.ts
import { ChartData } from '@/types/dashboard';

export const getChartData = (widgetTitle: string): ChartData[] => {
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
    // ... Add other chart data cases
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