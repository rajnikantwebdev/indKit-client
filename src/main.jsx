import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router";
import "./index.css";
import App from "./App.jsx";
import RegisterPage from "./component/Register.jsx";
import EmployeeList from "./component/EmployeeList.jsx";
import Navbar from "./component/Header.jsx";
import LoginPage from "./component/Login.jsx";
import Dashboard from "./component/Dashboard.jsx"

// ProtectedRoute component to restrict access to authenticated users
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

// Component to conditionally render Navbar based on route
const Layout = ({ children }) => {
  const location = useLocation();
  const showNavbar =
    location.pathname === "/dashboard" ||
    location.pathname === "/employee/list";

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem("token") ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/list"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  </StrictMode>
);
