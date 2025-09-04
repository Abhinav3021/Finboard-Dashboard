'use client';

import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Settings } from 'lucide-react';
import { useFinancialData } from '@/lib/hooks/useFinancialData';
import WidgetCard from './WidgetCard';
import WidgetTable from './WidgetTable';
import WidgetChart from './WidgetChart';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import EditWidgetDialog from './EditWidgetDialog';

interface WidgetProps {
  widget: {
    id: string;
    name: string;
    apiUrl: string;
    refreshInterval: number;
    displayMode: 'card' | 'table' | 'chart';
    selectedFields: string[];
  };
  onRemove: () => void;
}

export default function Widget({ widget, onRemove }: WidgetProps) {
  const { data, isLoading, error } = useFinancialData(widget.apiUrl, widget.refreshInterval);

  const renderWidgetContent = () => {
    if (error) {
      return <div className="p-4 text-center text-red-500">Error: {error}</div>;
    }

    switch (widget.displayMode) {
      case 'card':
        return <WidgetCard data={data} selectedFields={widget.selectedFields} isLoading={isLoading} />;
      case 'table':
        return <WidgetTable data={data} selectedFields={widget.selectedFields} isLoading={isLoading} />;
      case 'chart':
        return <WidgetChart data={data} selectedFields={widget.selectedFields} isLoading={isLoading} />;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full relative flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium truncate">{widget.name}</CardTitle>
        <div className="flex space-x-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <EditWidgetDialog widgetId={widget.id} />
          </Dialog>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <div className="flex-grow">
        {renderWidgetContent()}
      </div>
    </Card>
  );
}
