import { useState } from 'react';
import type { LostFoundItem } from '@/types';
import AddItemForm from '@/components/AddItemForm';

interface AddItemProps {
  items: LostFoundItem[];
  onAdd: (item: LostFoundItem) => void;
}

export default function AddItem({ items, onAdd }: AddItemProps) {
  const [localItems] = useState(items);

  return <AddItemForm onSubmit={onAdd} />;
}
