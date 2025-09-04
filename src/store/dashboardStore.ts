// src/store/dashboardStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Layout } from 'react-grid-layout';

interface Widget {
  id: string;
  name: string;
  apiUrl: string;
  refreshInterval: number;
  displayMode: 'card' | 'table' | 'chart';
  selectedFields: string[];
  layout: { x: number; y: number; w: number; h: number };
}

interface DashboardState {
  widgets: Widget[];
  addWidget: (widget: Omit<Widget, 'id' | 'layout'> & Partial<Widget>) => void;
  removeWidget: (id: string) => void;
  updateLayout: (newLayout: Layout[]) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      widgets: [],
      addWidget: (widget) =>
        set((state) => {
          // Add default layout properties if they are not provided
          const newWidget = {
            ...widget,
            id: widget.id || Math.random().toString(36).substring(7), // Ensure unique ID
            layout: widget.layout || { x: 0, y: Infinity, w: 4, h: 6 },
          };
          return { widgets: [...state.widgets, newWidget] };
        }),
      removeWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
        })),
      updateLayout: (newLayout) => {
        set((state) => {
          const updatedWidgets = state.widgets.map((widget) => {
            const layoutItem = newLayout.find((item) => item.i === widget.id);
            if (layoutItem) {
              return {
                ...widget,
                layout: {
                  x: layoutItem.x,
                  y: layoutItem.y,
                  w: layoutItem.w,
                  h: layoutItem.h,
                },
              };
            }
            return widget;
          });
          return { widgets: updatedWidgets };
        });
      },
    }),
    {
      name: 'finboard-storage', // unique name
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);