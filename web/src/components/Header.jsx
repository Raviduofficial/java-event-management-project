import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-[#1e293b] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">EventApp</Link>
        </h1>
        <nav>
          <Link className="mr-4 hover:underline" to="/">Home</Link>
          <Link className="mr-4 hover:underline" to="/about">About</Link>
          <Link className="hover:underline" to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
