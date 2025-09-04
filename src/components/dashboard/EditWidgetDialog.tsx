'use client';

import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { fetchFinancialData } from '@/lib/api/financialApi';

interface EditWidgetDialogProps {
  widgetId: string;
}

export default function EditWidgetDialog({ widgetId }: EditWidgetDialogProps) {
  const widget = useDashboardStore(state => state.widgets.find(w => w.id === widgetId));
  const updateWidget = useDashboardStore(state => state.updateWidget);

  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [name, setName] = useState(widget?.name || '');
  const [apiUrl, setApiUrl] = useState(widget?.apiUrl || '');
  const [displayMode, setDisplayMode] = useState<'card' | 'table' | 'chart'>(widget?.displayMode || 'card');
  const [refreshInterval, setRefreshInterval] = useState(widget?.refreshInterval || 30);
  const [selectedFields, setSelectedFields] = useState<string[]>(widget?.selectedFields || []);

  const handleTestApi = useCallback(async (e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsLoading(true);
    setError(null);
    setApiResponse(null);
    setSelectedFields([]);

    try {
      const data = await fetchFinancialData(apiUrl);
      setApiResponse(data);
    } catch (err: any) {
      setError(`Failed to fetch API data: ${err.message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, setSelectedFields, setApiResponse, setError, setIsLoading]);

  useEffect(() => {
    if (apiUrl) {
      handleTestApi();
    }
  }, [apiUrl, handleTestApi]);

  const handleFieldChange = (key: string, isChecked: boolean) => {
    setSelectedFields(prev =>
      isChecked ? [...prev, key] : prev.filter(field => field !== key)
    );
  };

  const renderFields = (data: any, parentKey = ''): React.ReactNode[] => {
    if (Array.isArray(data) && data.length > 0) {
      return renderFields(data[0]);
    }
    if (typeof data !== 'object' || data === null) {
      return [<div key={parentKey} className="flex items-center space-x-2">
        <Checkbox id={parentKey} checked={selectedFields.includes(parentKey)} onCheckedChange={(checked) => handleFieldChange(parentKey, !!checked)} />
        <Label htmlFor={parentKey}>{parentKey.split('.').pop()}</Label>
      </div>];
    }

    const keys = Object.keys(data);
    return keys.flatMap(key => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof data[key] === 'object' && data[key] !== null) {
        return (
          <div key={fullKey} className="ml-4 border-l pl-2">
            <span className="font-semibold text-sm">{key}</span>
            {renderFields(data[key], fullKey)}
          </div>
        );
      }
      return [<div key={fullKey} className="flex items-center space-x-2 mt-2">
        <Checkbox id={fullKey} checked={selectedFields.includes(fullKey)} onCheckedChange={(checked) => handleFieldChange(fullKey, !!checked)} />
        <Label htmlFor={fullKey}>{key}</Label>
      </div>];
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (widgetId && apiUrl) {
      updateWidget(widgetId, {
        name,
        apiUrl,
        refreshInterval,
        displayMode,
        selectedFields
      });
    }
  };

  if (!widget) return null;

  return (
    <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>Edit Widget</DialogTitle>
        <DialogDescription>
          Make changes to your widget here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 py-4">
        <div>
          <Label htmlFor="name">Widget Name</Label>
          <Input id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="apiUrl">API URL</Label>
          <div className="flex space-x-2">
            <Input id="apiUrl" name="apiUrl" type="url" required value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} />
            <Button type="button" onClick={handleTestApi} disabled={isLoading || !apiUrl}>
              {isLoading ? 'Testing...' : 'Test API'}
            </Button>
          </div>
        </div>
        {isLoading && <p>Fetching API response...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {apiResponse && (
          <div className="border rounded-md p-4 max-h-48 overflow-y-auto">
            <h4 className="font-semibold mb-2">Select Data Fields:</h4>
            {renderFields(apiResponse)}
          </div>
        )}
        <div>
          <Label htmlFor="refreshInterval">Refresh Interval (seconds)</Label>
          <Input id="refreshInterval" name="refreshInterval" type="number" required value={refreshInterval} onChange={(e) => setRefreshInterval(parseInt(e.target.value, 10))} />
        </div>
        <div>
          <Label>Display Mode</Label>
          <RadioGroup value={displayMode} onValueChange={(val: 'card' | 'table' | 'chart') => setDisplayMode(val)}>
            <div className="flex items-center space-x-2"><RadioGroupItem value="card" id="card" /><Label htmlFor="card">Card</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="table" id="table" /><Label htmlFor="table">Table</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="chart" id="chart" /><Label htmlFor="chart">Chart</Label></div>
          </RadioGroup>
        </div>
        <DialogClose asChild>
          <Button type="submit" disabled={!apiResponse || selectedFields.length === 0}>
            Save Changes
          </Button>
        </DialogClose>
      </form>
    </DialogContent>
  );
}
