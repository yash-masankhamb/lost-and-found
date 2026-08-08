import { Search } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Search className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <span className="text-base font-bold text-gray-900">Lost &amp; Found</span>
          </div>
          <p className="text-sm text-gray-400">
            Helping communities reunite with what matters most.
          </p>
          <p className="text-sm text-gray-400">&copy; 2026 Lost &amp; Found</p>
        </div>
      </div>
    </footer>
  );
}
