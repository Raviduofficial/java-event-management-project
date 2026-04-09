import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Organizations from './pages/Organizations';
import OrganizationOverview from './pages/OrganizationOverView';
import RootLayout from './layouts/RootLayout';
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
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/organization-overview" element={<OrganizationOverview />} />
        <Route path="/add-event" element={<AddEvent />} />

        <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN_LEC"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-coordinator" element={<AddCoordinator />} />
          <Route path="/add-venue" element={<AddVenue />} />
        </Route>


        <Route path="/venues" element={<Venues />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/coordinator-dashboard" element={<CoordinatorDashboard />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/manage-event" element={<ManageEvent />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;