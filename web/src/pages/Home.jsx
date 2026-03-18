import React from "react";

export default function Home() {
  return (
    <div className="container mx-auto my-20 text-center text-white">
      <h2 className="text-3xl font-semibold mb-4">Welcome to EventApp</h2>
      <p className="mb-6">
        This is a simple home page where you can browse upcoming events,
        manage bookings, and more. Use the navigation above to explore the
        site.
      </p>
      <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-md">
        See Events
      </button>
    </div>
  );
}
