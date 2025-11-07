import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Classes from './pages/Classes';
import ClassDetails from './pages/ClassDetails';
import Trainers from './pages/Trainers';
import TrainerDetail from './pages/TrainerDetail';
import Memberships from './pages/Memberships';
import MembershipDetail from './pages/MembershipDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Subscribe from './pages/Subscribe';

// Protected Pages
// Removed user Dashboard/Profile/MyClasses per requirements

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/Users';
import AdminTrainers from './pages/admin/AdminTrainers';
import AdminClasses from './pages/admin/AdminClasses';
import AdminMemberships from './pages/admin/Memberships';
import AdminFeedback from './pages/admin/Feedback';
import AdminContacts from './pages/admin/Contacts';

// Route Protection
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';

// Not Found
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/:id" element={<ClassDetails />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainers/:id" element={<TrainerDetail />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/memberships/:id" element={<MembershipDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/subscribe" element={<Subscribe />} />

          {/* Protected Routes - removed user dashboard/profile/my-classes */}

          {/* Admin Routes renamed to Dashboard */}
          <Route path="/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/dashboard/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/dashboard/trainers" element={<AdminRoute><AdminTrainers /></AdminRoute>} />
          <Route path="/dashboard/classes" element={<AdminRoute><AdminClasses /></AdminRoute>} />
          <Route path="/dashboard/memberships" element={<AdminRoute><AdminMemberships /></AdminRoute>} />
          <Route path="/dashboard/feedback" element={<AdminRoute><AdminFeedback /></AdminRoute>} />
          <Route path="/dashboard/contacts" element={<AdminRoute><AdminContacts /></AdminRoute>} />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;