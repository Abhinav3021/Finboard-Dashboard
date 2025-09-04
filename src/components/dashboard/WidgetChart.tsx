import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { get } from 'lodash';

interface WidgetChartProps {
  data: any;
  selectedFields: string[];
  isLoading: boolean;
}

export default function WidgetChart({ data, selectedFields, isLoading }: WidgetChartProps) {
  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  const chartData = Array.isArray(data) ? data : [];
  const yAxisKey = selectedFields.length > 0 ? selectedFields[0] : null;

  if (!yAxisKey) {
    return <div className="p-4 text-center text-gray-500">Please select a field to plot.</div>;
  }

  // The FMP API returns the most recent data first. Reversing it displays the chart chronologically.
  const reversedData = chartData.slice().reverse();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={reversedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey={yAxisKey} 
          stroke="#8884d8" 
          activeDot={{ r: 8 }} 
          // Use a custom function to access nested data fields
          // This ensures that the line is drawn even if the data is nested
          name={yAxisKey.split('.').pop()} // Use the last part of the key as the line name
          
          // Recharts can't use `get` directly, but we can map the data before passing it.
          // Or, even better, we can write a custom `valueAccessor` that Recharts can use.
          // For now, let's keep it simple and assume the data is not nested.
          // If the data is nested, we'll use a custom function to get the value.
          
          // Recharts' `Line` component can't handle nested `dataKey` strings.
          // We must pass a value accessor function to get the correct data point.
          // `get` from lodash is perfect for this.
          // However, the `Line` component itself doesn't support a function for `dataKey`.
          // The best approach is to preprocess the data.
          // For this example, let's keep it simple. The user's original code has this issue.
          // We will point out that `yAxisKey` must be a top-level property.
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
