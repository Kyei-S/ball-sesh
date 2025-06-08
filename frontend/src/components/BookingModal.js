import Modal from 'react-modal';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RWKILPgruyUJt2sbAPDpjCVUU3qDG5MF44w6hehtTRvWm0QFg6oWjQKPihVvqJ8oim2TwKeYvvQROY8NNR5nbUE00xeoUbbCU'); // Use your actual public key

// Set the app element for accessibility
Modal.setAppElement('#root');

export default function BookingModal({ session, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const stripe = await stripePromise;
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session._id, ...form }),
      });
      if (!res.ok) throw new Error('Failed to create checkout session');
      const { url } = await res.json();
      window.location = url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={!!session}
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

      <h2 className="text-2xl font-bold mb-4">Book: {session?.venue}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary/90 transition"
        >
          {loading ? 'Redirecting…' : 'Continue to Payment'}
        </button>
      </form>
    </Modal>
  );
}
