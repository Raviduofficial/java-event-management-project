import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="text-8xl font-extrabold text-blue-800 mb-6 drop-shadow-md">404</div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">Oops! Page Not Found</h1>
      <p className="text-gray-600 mb-6 max-w-md mx-auto text-lg">
        The page you are looking for has been moved or doesn't exist.
      </p>
      
      <div className="mb-8 p-4 bg-blue-50 text-blue-700 rounded-lg shadow-sm border border-blue-100">
        Redirecting you to the home page in <span className="font-bold text-xl">{countdown}</span> seconds...
      </div>

      <Link 
        to="/" 
        className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800 hover:shadow-md transition-all duration-300"
      >
        Go Back Now
      </Link>
    </div>
  );
};

export default NotFound;
