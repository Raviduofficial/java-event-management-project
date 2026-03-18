import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
// import { useAuth } from "./hooks/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
import RootLayout from "./layouts/RootLayout";

function App() {
  // const { isAuthenticated, loading, user } = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        toastClassName={() =>
          "relative flex p-5 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-[#0f172a] text-white"
        }
      />
    </>
  );
}

export default App;