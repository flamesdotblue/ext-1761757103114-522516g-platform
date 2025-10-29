import { useState } from 'react';
import { Search } from 'lucide-react';

export default function PhoneLookupForm({ onLookup, loading }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const digits = value.replace(/\D/g, '');
    if (digits.length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setError('');
    onLookup(digits);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="phone" className="sr-only">Phone number</label>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="Enter your phone number"
            className="w-full rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-black text-white px-5 py-3 font-medium shadow-sm hover:bg-black/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Search className="h-5 w-5" />
          {loading ? 'Searching…' : 'Find Orders'}
        </button>
      </div>
    </form>
  );
}
