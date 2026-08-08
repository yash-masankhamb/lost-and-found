import { PackageSearch } from 'lucide-react';
import type { LostFoundItem } from '@/types';
import ItemCard from './ItemCard';

interface ItemGridProps {
  items: LostFoundItem[];
}

export default function ItemGrid({ items }: ItemGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-5">
          <PackageSearch className="w-10 h-10 text-blue-500" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No items yet</h3>
        <p className="text-gray-400 max-w-sm">
          There are no lost or found items posted right now. Be the first to add one and help reunite something with its owner.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
