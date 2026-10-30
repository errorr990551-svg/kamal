import React, { useState, useEffect } from 'react';
import BrandHeader from './components/BrandHeader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import LeadPopupModal from './components/LeadPopupModal';

import HomePage from './pages/HomePage';
import DealershipPage from './pages/DealershipPage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import HampersPage from './pages/HampersPage';
import ContractManufacturingPage from './pages/ContractManufacturingPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Synchronize route with URL pathname for proper SEO and SPA deep linking
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      if (['dealership', 'products', 'about', 'hampers', 'contract'].includes(path)) {
        setActiveTab(path);
      } else {
        setActiveTab('home');
      }
    };

    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const targetPath = tabId === 'home' ? '/' : `/${tabId}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
  };

  // If user types search query while on home or other tabs, auto navigate to products page for full view
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query.trim().length > 0 && activeTab !== 'products') {
      handleTabChange('products');
    }
  };

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage setActiveTab={handleTabChange} searchQuery={searchQuery} />;
      case 'dealership':
        return <DealershipPage showToast={showToast} />;
      case 'products':
        return <ProductsPage searchQuery={searchQuery} setSearchQuery={setSearchQuery} showToast={showToast} setActiveTab={handleTabChange} />;
      case 'about':
        return <AboutPage />;
      case 'hampers':
        return <HampersPage showToast={showToast} />;
      case 'contract':
        return <ContractManufacturingPage showToast={showToast} />;
      default:
        return <HomePage setActiveTab={handleTabChange} searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="min-h-screen bg-kamal-website-bg text-stone-800 flex flex-col justify-between selection:bg-red-800 selection:text-amber-100">
      <div>
        {/* Top Kamal Brand Header Banner */}
        <BrandHeader subtitle="savour the authentic flavors in every bite" />

        {/* Navigation Bar shifted below Kamal Brand banner & above second section */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
        />

        {/* Dynamic Main Page Content */}
        <main className="w-full">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Footer */}
      <Footer setActiveTab={handleTabChange} />

      {/* 1.5s Consultation Lead Popup Modal (Image 2 format with website theme) */}
      <LeadPopupModal />

      {/* Toast Popup Notification */}
      {toastMessage && (
        <Toast 
          message={toastMessage} 
          onClose={() => setToastMessage(null)} 
        />
      )}
    </div>
  );
}
