// A small in-memory dataset to simulate order lookup by phone number (last 10 digits)

const db = {
  // 5551234567 has two orders
  '5551234567': [
    {
      orderId: 'INV-1045',
      date: '2025-09-18T14:22:00Z',
      status: 'Shipped',
      paymentStatus: 'Paid',
      paymentMethod: 'VISA **** 4242',
      shippingAddress: 'Alex Johnson\n221B Baker Street\nLondon NW1 6XE\nUnited Kingdom',
      items: [
        { name: 'Smart Wallet Pro', qty: 1, price: 69.0 },
        { name: 'RFID Card Holder', qty: 2, price: 19.0 },
      ],
      shipping: 5,
      tax: 8.24,
      total: 120.24,
    },
    {
      orderId: 'INV-1019',
      date: '2025-08-03T10:05:00Z',
      status: 'Delivered',
      paymentStatus: 'Paid',
      paymentMethod: 'UPI • alex@okbank',
      shippingAddress: 'Alex Johnson\n221B Baker Street\nLondon NW1 6XE\nUnited Kingdom',
      items: [
        { name: 'Minimalist Card Case', qty: 1, price: 25.0 },
        { name: 'Gift Wrap', qty: 1, price: 3.5 },
      ],
      shipping: 0,
      tax: 2.02,
      total: 30.52,
    },
  ],
  // 9876543210 has one order, pending
  '9876543210': [
    {
      orderId: 'INV-1102',
      date: '2025-10-21T09:11:00Z',
      status: 'Processing',
      paymentStatus: 'Pending',
      paymentMethod: 'Cash on Delivery',
      shippingAddress: 'Priya Verma\n32 MG Road\nBengaluru, KA 560001\nIndia',
      items: [
        { name: 'Neo Visa Card', qty: 1, price: 0 },
        { name: 'Premium Plan (Annual)', qty: 1, price: 99.0 },
      ],
      shipping: 0,
      tax: 0,
      total: 99.0,
    },
  ],
};

export function findOrdersByPhone(phone) {
  const digits = String(phone).replace(/\D/g, '').slice(-10);
  return db[digits] ? [...db[digits]] : [];
}
