'use client';

import React, { useEffect, useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Widget from './Widget';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function DashboardLayout() {
  const { widgets, updateLayout, removeWidget } = useDashboardStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onLayoutChange = (newLayout: Layout[]) => {
    updateLayout(newLayout);
  };

  const layout = widgets.map(widget => ({
    i: widget.id,
    x: widget.layout.x,
    y: widget.layout.y,
    w: widget.layout.w,
    h: widget.layout.h,
  }));
  
  if (!isClient) {
    return <div className="p-4 text-center text-gray-500">Loading dashboard...</div>;
  }

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  return (
    <div className="w-full h-full p-4">
      {widgets.length > 0 ? (
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout }}
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={100}
          onLayoutChange={onLayoutChange}
          onResizeStop={onLayoutChange}
          isResizable={true}
        >
          {widgets.map((widget) => (
            <div key={widget.id}>
              <Widget
                widget={widget}
                onRemove={() => removeWidget(widget.id)}
              />
            </div>
          ))}
        </ResponsiveGridLayout>
      ) : (
        <p className="text-center text-gray-500">No widgets added yet. Click the &quot;+&quot; button to get started.</p>
      )}
    </div>
  );
}
