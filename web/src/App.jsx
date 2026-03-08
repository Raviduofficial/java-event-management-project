import { useState } from "react";

export default function App() {
  const [events, setEvents] = useState(5);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-900 mb-2">
          Welcome to Rutech Event Management
        </h1>
        <p className="text-indigo-700 text-lg">
          Manage your events, tickets, and participants effortlessly
        </p>
      </header>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
          Upcoming Events
        </h2>
        <p className="text-indigo-600 mb-6">
          You currently have <span className="font-bold">{events}</span> events
          scheduled.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setEvents(events + 1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Add Event
          </button>
          <button
            onClick={() => setEvents(events > 0 ? events - 1 : 0)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Remove Event
          </button>
        </div>
      </div>

      <footer className="mt-10 text-center text-indigo-700">
        <p>
          Visit our{" "}
          <a
            href="https://rutech.com"
            target="_blank"
            className="underline hover:text-indigo-900"
          >
            official website
          </a>{" "}
          for more info.
        </p>
      </footer>
    </div>
  );
}