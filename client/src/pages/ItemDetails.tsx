import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, Mail, Phone, User, CheckCircle2 } from 'lucide-react';
import type { LostFoundItem } from '@/types';

interface ItemDetailsProps {
  items: LostFoundItem[];
}

export default function ItemDetails({ items }: ItemDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = items.find((i) => i.id === id);

  const [status, setStatus] = useState(item?.status || 'Open');

  if (!item) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Item not found</h2>
        <p className="text-gray-500 mb-6">The item you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/')} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
          Back to Home
        </button>
      </div>
    );
  }

  const isLost = item.type === 'lost';
  const isResolved = status === 'Resolved';

  const detailRow = (icon: React.ReactNode, label: string, value: string) => (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold text-gray-900 mt-0.5 break-words">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-[4/3]">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold text-white shadow-md ${isLost ? 'bg-red-500' : 'bg-green-500'}`}>
              {isLost ? 'Lost' : 'Found'}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{item.name}</h1>
            <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap flex-shrink-0 ${
              isResolved ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}>
              {status}
            </span>
          </div>

          <p className="text-gray-500 leading-relaxed mb-6">{item.description}</p>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
            {detailRow(<MapPin className="w-4 h-4" />, 'Location', item.location)}
            {detailRow(<Calendar className="w-4 h-4" />, 'Date', new Date(item.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }))}
            {detailRow(<Clock className="w-4 h-4" />, 'Time', item.time)}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-2">Contact Information</h3>
            {detailRow(<User className="w-4 h-4" />, 'Name', item.contact.name)}
            {detailRow(<Mail className="w-4 h-4" />, 'Email', item.contact.email)}
            {detailRow(<Phone className="w-4 h-4" />, 'Phone', item.contact.phone)}
          </div>

          <button
            onClick={() => setStatus('Resolved')}
            disabled={isResolved}
            className={`w-full py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              isResolved
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            {isResolved ? 'Item Resolved' : 'Mark as Resolved'}
          </button>
        </div>
      </div>
    </div>
  );
}
