import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { MessVendorPage } from './pages/MessVendorPage';
import { NGOPage } from './pages/NGOPage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
      {currentPage === 'analytics' && <AnalyticsPage />}
      {currentPage === 'kitchens' && <MessVendorPage />}
      {currentPage === 'ngos' && <NGOPage />}
      {currentPage === 'get-involved' && <GetInvolvedPage />}
    </Layout>
  );
};

export default App;