import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/layout/CommandPalette';
import { EmergencyModal } from './components/layout/EmergencyModal';
import { ToastContainer } from './components/ui/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { NavigationPage } from './pages/NavigationPage';
import { SchedulePage } from './pages/SchedulePage';
import { MentorPage } from './pages/MentorPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { LostFoundPage } from './pages/LostFoundPage';
import { EcoPage } from './pages/EcoPage';
import { ActivityPage } from './pages/ActivityPage';
import { HelpPage } from './pages/HelpPage';
import { DemoPage } from './pages/DemoPage';
import { AboutPage } from './pages/AboutPage';
import { ContactsPage } from './pages/ContactsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const MainLayout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1F23] flex flex-col font-sans selection:bg-[#7A1526] selection:text-white">
      <ScrollToTop />
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content View with Dynamic Routing */}
      <main className={isHome ? "flex-1 w-full" : "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/navigation" element={<NavigationPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/mentor" element={<MentorPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/lost-found" element={<LostFoundPage />} />
          <Route path="/eco" element={<EcoPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Modern Developer-Tooling / eGov Footer */}
      <Footer />

      {/* Global Modals & Overlays */}
      <CommandPalette />
      <EmergencyModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </BrowserRouter>
  );
}
