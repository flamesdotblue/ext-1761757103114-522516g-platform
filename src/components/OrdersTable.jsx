import { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/format';

function PaymentBadge({ status }) {
  const normalized = String(status || '').toLowerCase();
  if (normalized === 'paid') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 text-green-700 px-2.5 py-1 text-xs font-medium border border-green-200">
        <CheckCircle2 className="h-4 w-4" /> Paid
      </span>
    );
  }
  if (normalized === 'pending') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-700 px-2.5 py-1 text-xs font-medium border border-amber-200">
        <Clock className="h-4 w-4" /> Pending
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 text-red-700 px-2.5 py-1 text-xs font-medium border border-red-200">
      <XCircle className="h-4 w-4" /> Failed
    </span>
  );
}

export default function OrdersTable({ orders, hasSearched, loading }) {
  const [expanded, setExpanded] = useState({});

  const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  if (!hasSearched && !loading) {
    return (
      <div className="text-center text-gray-500">
        Enter your phone number above to view your orders.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-gray-50 h-24" />
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No orders to show yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-sm font-medium text-gray-600 border-b border-gray-200">
        <div className="col-span-3">Order</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-3">Items</div>
        <div className="col-span-2">Total</div>
        <div className="col-span-2">Payment</div>
      </div>
      <ul className="divide-y divide-gray-200">
        {orders.map((order) => {
          const isOpen = !!expanded[order.orderId];
          const itemsCount = order.items.reduce((sum, it) => sum + (it.qty || 1), 0);
          return (
            <li key={order.orderId}>
              <div className="grid md:grid-cols-12 gap-4 px-4 sm:px-6 py-4 items-center">
                <div className="md:col-span-3">
                  <button
                    onClick={() => toggle(order.orderId)}
                    className="inline-flex items-center gap-2 text-left font-medium hover:text-gray-900"
                    aria-expanded={isOpen}
                    aria-controls={`details-${order.orderId}`}
                  >
                    {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    <span className="truncate">#{order.orderId}</span>
                  </button>
                  <div className="text-xs text-gray-500 mt-1">{order.status}</div>
                </div>
                <div className="md:col-span-2 text-gray-700">{formatDate(order.date)}</div>
                <div className="md:col-span-3 text-gray-700">
                  {itemsCount} item{itemsCount !== 1 ? 's' : ''}
                  <div className="hidden md:block text-xs text-gray-500 truncate">
                    {order.items.map((it) => it.name).join(', ')}
                  </div>
                </div>
                <div className="md:col-span-2 font-semibold text-gray-900">{formatCurrency(order.total)}</div>
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2">
                    <PaymentBadge status={order.paymentStatus} />
                    <span className="text-xs text-gray-500">{order.paymentMethod}</span>
                  </div>
                </div>
              </div>

              {isOpen && (
                <div id={`details-${order.orderId}`} className="px-4 sm:px-6 pb-5">
                  <div className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="md:col-span-2 p-4 sm:p-5">
                        <h4 className="font-medium mb-3">Items</h4>
                        <ul className="divide-y divide-gray-200">
                          {order.items.map((it, idx) => (
                            <li key={idx} className="py-3 flex items-start justify-between gap-4">
                              <div>
                                <div className="font-medium">{it.name}</div>
                                <div className="text-sm text-gray-500">Qty: {it.qty || 1}</div>
                              </div>
                              <div className="text-sm font-semibold">{formatCurrency(it.price * (it.qty || 1))}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="border-t md:border-t-0 md:border-l border-gray-200 p-4 sm:p-5 bg-white">
                        <h4 className="font-medium mb-3">Summary</h4>
                        <dl className="space-y-2 text-sm">
                          <div className="flex justify-between"><dt className="text-gray-600">Items</dt><dd className="font-medium">{formatCurrency(order.items.reduce((s, it) => s + it.price * (it.qty || 1), 0))}</dd></div>
                          <div className="flex justify-between"><dt className="text-gray-600">Shipping</dt><dd className="font-medium">{formatCurrency(order.shipping || 0)}</dd></div>
                          <div className="flex justify-between"><dt className="text-gray-600">Tax</dt><dd className="font-medium">{formatCurrency(order.tax || 0)}</dd></div>
                          <div className="pt-2 border-t border-gray-200 flex justify-between text-base"><dt className="">Total</dt><dd className="font-semibold">{formatCurrency(order.total)}</dd></div>
                        </dl>
                        <div className="mt-4">
                          <h5 className="text-sm font-medium text-gray-700">Shipping Address</h5>
                          <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{order.shippingAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
