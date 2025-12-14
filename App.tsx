import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Events } from './pages/Events';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { AdminDashboard, AdminLogin } from './pages/AdminDashboard';

// Wrapper to conditionally render Layout (we might not want Nav on Admin Login)
const AppContent = () => {
    const location = useLocation();
    // Don't show public layout for admin dashboard to allow full sidebar layout, 
    // but do show it for login or keep it separate. 
    // Here we will keep layout for public pages, but specific layout for admin.
    
    const isDashboard = location.pathname === '/admin';
    const isLogin = location.pathname === '/admin/login';

    if (isDashboard) return <AdminDashboard />;
    if (isLogin) return <AdminLogin />;

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Layout>
    );
}

const App = () => {
  return (
    <Router>
      <Routes>
          {/* Admin routes handled inside AppContent logic or separate routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="*" element={
              <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
              </Layout>
          } />
      </Routes>
    </Router>
  );
};

export default App;