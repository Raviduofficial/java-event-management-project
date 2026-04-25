import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Organizations from './pages/Organizations';
import OrganizationDetails from './pages/OrganizationDetails';
import RootLayout from './layouts/RootLayout';
import AddEvent from './pages/AddEvent';
import AdminDashboard from './pages/AdminDashboard';
import AddCoordinator from './pages/AddCoordinator';
import Venues from './pages/Venues';
import AddVenue from './pages/AddVenue';
import VenueDetails from './pages/VenueDetails';
import About from './pages/About';
import Events from './pages/Events';
import ManageUsers from './pages/ManageUsers';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import EventDetails from './pages/EventDetails';
import ManageEvent from './pages/ManageEvent';
import ModifyEvent from './pages/ModifyEvent';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';

function App() {

  const { user, isAuthenticated } = useAuth();

  return (
    <ToastProvider>
      <Routes>
        <Route element={<RootLayout />}>

        {/* ── Public Routes ── */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/login" element={
          !isAuthenticated ? (
            <Login />
          ) : user?.role === "ROLE_BATCH_REP" ? (
            <Navigate to="/coordinator/dashboard" />
          ) : user?.role === "ROLE_ORGANIZATION" ? (
            <Navigate to="/coordinator/dashboard" />
          ) : user?.role === "ROLE_ADMIN_LEC" ? (
            <Navigate to="/admin/dashboard" />
          ) : (
            <Navigate to="/" />
          )
        } />

        {/* ── Venues (Public Browse) ── */}
        <Route path="/venues" element={<Venues />} />
        <Route path="/venues/:id" element={<VenueDetails />} />

        {/* ── Events (Public Browse) ── */}
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />

        {/* ── Organizations (Public Browse) ── */}
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/organizations/:id" element={<OrganizationDetails />} />

        {/* ── Admin Protected Routes (Lecturers Only) ── */}
        <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN_LEC"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/venues/manage" element={<AddVenue />} />
          <Route path="/admin/coordinators/add" element={<AddCoordinator />} />
          <Route path="/admin/users/manage" element={<ManageUsers />} />
        </Route>

        {/* ── Coordinator Protected Routes (Batch Reps & Organizations) ── */}
        <Route element={<ProtectedRoute allowedRoles={["ROLE_BATCH_REP", "ROLE_ORGANIZATION"]} />}>
          <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
          <Route path="/coordinator/events/add" element={<AddEvent />} />
          <Route path="/coordinator/events/:id/modify" element={<ModifyEvent />} />
          <Route path="/admin/events/:id/manage" element={<ManageEvent />} />
        </Route>

        {/* ── 404 ── */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </ToastProvider>
  );
}

export default App;