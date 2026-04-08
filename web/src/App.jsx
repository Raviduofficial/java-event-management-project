import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Organizations from './pages/Organizations';
import OrganizationOverview from './pages/OrganizationOverView';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import AddEvent from './pages/AddEvent';
import AdminDashboard from './pages/AdminDashboard'; 
import AddCoordinator from './pages/AddCoordinator';
import Venues from './pages/Venues';
import AddVenue from './pages/AddVenue';
import About from './pages/About';
import Events from './pages/Events'; 
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import EventDetails from './pages/EventDetails';
import ManageEvent from './pages/ManageEvent';

function App() {
  const location = useLocation();
  
  // Login පේජ් එකේදී විතරක් Navbar සහ Footer හංගන්න
  const showLayout = location.pathname !== '/login';

  return (
    // මුළු ඇප් එකම flexbox එකක් කරාම, Footer එක හැමතිස්සෙම යටින්ම තියෙනවා
    <div className="flex flex-col min-h-screen"> 
      
      {/* 1. Top Navigation */}
      {showLayout && <Navbar />}
      
      {/* 2. Main Page Content (මෙතනින් තමයි පේජස් මාරු වෙන්නේ) */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/organizations" element={<Organizations />} /> 
          <Route path="/organization-overview" element={<OrganizationOverview />} />
          <Route path="/add-event" element={<AddEvent />} /> 
          <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
          <Route path="/add-coordinator" element={<AddCoordinator />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/add-venue" element={<AddVenue />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} /> 
          <Route path="/coordinator-dashboard" element={<CoordinatorDashboard />} />
          <Route path="/event-details" element={<EventDetails />} />
          <Route path="/manage-event" element={<ManageEvent />} />
        </Routes>
      </div>

      {/* 3. Bottom Footer */}
      {showLayout && <Footer />}
      
    </div>
  );
}

export default App;