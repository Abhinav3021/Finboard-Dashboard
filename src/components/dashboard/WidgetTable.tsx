// src/components/dashboard/WidgetTable.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { get } from 'lodash';

interface WidgetTableProps {
  data: any;
  selectedFields: string[];
  isLoading: boolean;
}

export default function WidgetTable({ data, selectedFields, isLoading }: WidgetTableProps) {
  if (isLoading) {
    return <Skeleton className="h-full w-full" />;
  }

  // Ensure data is an array
  const tableData = Array.isArray(data) ? data : [];

  return (
    <div className="overflow-auto max-h-full">
      <Table>
        <TableHeader>
          <TableRow>
            {selectedFields.map(field => (
              <TableHead key={field}>{field}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((item, index) => (
            <TableRow key={index}>
              {selectedFields.map(field => (
                <TableCell key={field}>{get(item, field, 'N/A')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}