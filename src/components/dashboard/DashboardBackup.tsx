// src/components/dashboard/DashboardBackup.tsx
'use client';

import React, { useRef } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from '@/components/ui/button';

export default function DashboardBackup() {
  const { widgets } = useDashboardStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const config = { widgets };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finboard-config-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedConfig = JSON.parse(event.target?.result as string);
          // Directly update the store with the imported state.
          // This bypasses the actions but is a quick way to restore the entire state.
          useDashboardStore.setState(importedConfig);
        } catch (error) {
          console.error("Error importing dashboard configuration:", error);
          alert("Invalid configuration file. Please upload a valid JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handleExport} variant="outline">
        Export Config
      </Button>
      <Button onClick={() => fileInputRef.current?.click()} variant="outline">
        Import Config
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImport}
        className="hidden"
        accept=".json"
        title="Import dashboard configuration JSON file"
        placeholder="Choose a JSON file"
      />
    </div>
  );
}