import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import SkillsPage from "./pages/SkillsPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ManageProjects from "./admin/ManageProjects";
import Messages from "./admin/Messages";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRegist from "./admin/AdminRegist";
import ManageAdmins from "./admin/ManageAdmins";

function App() {

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <ManageProjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/register"
          element={
            <ProtectedRoute>
              <AdminRegist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/admins"
          element={
            <ProtectedRoute>
              <ManageAdmins />
            </ProtectedRoute>
          }
        />

      </Routes>
      <Footer />
    </>
  );
}

export default App;