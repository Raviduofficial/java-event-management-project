export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#1e293b] text-gray-400 p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {year} EventApp. All rights reserved.</p>
      </div>
    </footer>
  );
}
