import { Link } from 'react-router-dom';
import { MapPin, Calendar, PackageSearch } from 'lucide-react';
import type { LostFoundItem } from '@/types';

export default function ItemCard({ item }: { item: LostFoundItem }) {
  const isLost = item.type === 'lost';
  const isOpen = item.status === 'Open';

  return (
    <Link
      to={`/item/${item.id}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold text-white shadow-sm ${
              isLost ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {isLost ? 'Lost' : 'Found'}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm ${
              isOpen ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
            }`}
          >
            {item.status}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 mb-1.5 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">
          {item.description}
        </p>

        <div className="flex flex-col gap-1.5 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
