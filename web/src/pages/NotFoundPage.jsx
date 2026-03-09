import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="container mx-auto my-20 text-center text-white">
      <h2 className="text-3xl font-semibold mb-4">404 - Page not found</h2>
      <p className="mb-6">Sorry, the page you're looking for doesn't exist.</p>
      <Link className="text-blue-400 hover:underline" to="/">
        Go back to home
      </Link>
    </div>
  );
}
