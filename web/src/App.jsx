import { Routes, Route, Navigate } from 'react-router-dom';
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
import { useAuth } from './contexts/AuthContext';

function App() {

  const { user, isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/organization-overview" element={<OrganizationOverview />} />
        <Route path="/add-event" element={<AddEvent />} />

        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login />
            ) : user?.role === "ROLE_BATCH_REP" ? (
              <Navigate to="/coordinator-dashboard" />
            ) : user?.role === "ROLE_ADMIN_LEC" ? (
              <Navigate to="/admin-dashboard" />
            ) : (
              <Navigate to="/" />
            )
          }
        />

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