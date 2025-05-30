import Modal from 'react-modal';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_YOUR_PUBLIC_KEY');

export default function BookingModal({ session, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    const stripe = await stripePromise;
    const res = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: session._id, ...form }),
    });
    const { url } = await res.json();
    window.location = url;
  };

  return (
    <Modal
      isOpen
      onRequestClose={onClose}
      className="bg-white rounded-lg p-6 max-w-md mx-auto relative mt-20 shadow-xl outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-800"
      >
        &times;
      </button>

      <h2 className="text-2xl font-bold mb-4">Book: {session.venue}</h2>
      <form onSubmit={submit} className="space-y-4">
        {['name', 'phone', 'email'].map(field => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              required
              value={form[field]}
              onChange={e => setForm({ ...form, [field]: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-heatRed"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-heatRed text-white py-2 rounded-md font-semibold hover:bg-red-700 transition"
        >
          {loading ? 'Redirecting…' : 'Continue to Payment'}
        </button>
      </form>
    </Modal>
  );
}
