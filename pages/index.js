// pages/index.js
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const { data: session } = useSession();

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await axios.post('/api/subscribe');
    const sessionId = response.data.id;

    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      console.error('Stripe checkout error:', error);
    }
  };

  const optimizeSystem = () => {
    alert('Simulated optimization process.');
  };

  return (
    <div>
      <h1>Optimizer App</h1>
      {session ? (
        <div>
          <p>Welcome, {session.user.name}</p>
          {session.user.role === 'admin' && <a href="/admin">Go to Admin Panel</a>}
          <button onClick={optimizeSystem}>Optimize System</button>
          <button onClick={handleCheckout}>Subscribe</button>
        </div>
      ) : (
        <a href="/api/auth/signin">Sign In</a>
      )}
    </div>
  );
}
