import { useState } from 'react';
import HeroCover from './components/HeroCover';
import PhoneLookupForm from './components/PhoneLookupForm';
import OrdersTable from './components/OrdersTable';
import Footer from './components/Footer';
import { findOrdersByPhone } from './data/orders';

export default function App() {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleLookup = async (inputPhone) => {
    setLoading(true);
    setError('');
    setHasSearched(true);
    try {
      // Simulate a small network delay
      await new Promise((r) => setTimeout(r, 600));
      const normalized = inputPhone.replace(/\D/g, '').slice(-10);
      setPhone(normalized);
      const results = findOrdersByPhone(normalized);
      setOrders(results);
      if (results.length === 0) {
        setError('No orders found for this phone number.');
      }
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <header className="relative">
        <HeroCover />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-56 sm:-mt-64 md:-mt-72 lg:-mt-80">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 overflow-hidden">
              <div className="p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                  Check your orders
                </h1>
                <p className="mt-2 text-gray-600">
                  Enter your phone number to view your order history, payment status, and details.
                </p>
                <div className="mt-6">
                  <PhoneLookupForm onLookup={handleLookup} loading={loading} />
                </div>
                {hasSearched && !loading && (
                  <div className="mt-6 text-sm text-gray-500">
                    Showing results for phone: {phone || '—'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3">
              {error}
            </div>
          )}
          <OrdersTable orders={orders} hasSearched={hasSearched} loading={loading} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
