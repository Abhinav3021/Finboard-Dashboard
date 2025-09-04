// src/components/dashboard/WidgetCard.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { get } from 'lodash';

interface WidgetCardProps {
  data: any;
  selectedFields: string[];
  isLoading: boolean;
}

export default function WidgetCard({ data, selectedFields, isLoading }: WidgetCardProps) {
  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }
  
  // Get the first object from the data array, if it exists
  const latestData = Array.isArray(data) && data.length > 0 ? data[0] : null;

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        {selectedFields.map(field => {
          const value = latestData ? get(latestData, field, 'N/A') : 'N/A';
          return (
            <div key={field} className="mb-2">
              <p className="text-sm font-semibold">{field}</p>
              <p className="text-lg">{value}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}