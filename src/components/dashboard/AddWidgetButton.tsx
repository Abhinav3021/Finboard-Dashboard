// src/components/dashboard/AddWidgetButton.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import AddWidgetForm from './AddWidgetForm';

export default function AddWidgetButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className='p-2'>
          Add New <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Widget</DialogTitle>
        </DialogHeader>
        <AddWidgetForm />
      </DialogContent>
    </Dialog>
  );
}