import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RootLayout = () => {
  const location = useLocation();
  const showLayout = location.pathname !== '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {showLayout && <Navbar />}
      <div className="flex-grow">
        <Outlet />
      </div>
      {showLayout && <Footer />}
    </div>
  );
};


export default RootLayout;
