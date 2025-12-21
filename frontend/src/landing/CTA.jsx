import React from 'react';

export default function CTA({ onLaunch }) {
  return (
    <section id="get-started" className="py-24 bg-accent text-black text-center">
      <h2 className="text-4xl font-bold mb-6">
        Build Authority. Get Indexed Faster.
      </h2>

      <button
        onClick={onLaunch}
        className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform cursor-pointer"
      >
        Login / Sign up
      </button>
    </section>
  );
}
