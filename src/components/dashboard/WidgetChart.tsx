import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { get } from "lodash";

interface WidgetChartProps {
  data: any;
  selectedFields: string[];
  isLoading: boolean;
}

export default function WidgetChart({
  data,
  selectedFields,
  isLoading,
}: WidgetChartProps) {
  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  const chartData = Array.isArray(data) ? data : [];
  const yAxisKey = selectedFields.length > 0 ? selectedFields[0] : null;

  if (!yAxisKey) {
    return (
      <div className="p-4 text-center text-gray-500">
        Please select a field to plot.
      </div>
    );
  }

  // ✅ Reverse to make it chronological
  const reversedData = chartData.slice().reverse();

  // ✅ Preprocess data to flatten nested fields if needed
  const processedData = reversedData.map((d) => ({
    ...d,
    [yAxisKey]: get(d, yAxisKey), // works for both "close" or "nested.field"
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={processedData}
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
          name={yAxisKey.split(".").pop()}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
