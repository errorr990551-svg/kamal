import React, { useEffect, useState } from 'react';
import BrandHeader from './components/BrandHeader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeadManager from './components/HeadManager';
import { EnquiryProvider } from './components/Enquiry';
import { Breadcrumbs, MobileActionBar } from './components/Common';
import { RouterProvider, useRouter } from './router';
import { resolveRoute, getBreadcrumbs } from './data/seo';

import HomePage from './pages/HomePage';
import DealershipPage from './pages/DealershipPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import HampersPage from './pages/HampersPage';
import ContractManufacturingPage from './pages/ContractManufacturingPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

function Shell() {
  const { path, navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const route = resolveRoute(path);

  // Leaving the product list clears the search so other pages are never shown filtered.
  useEffect(() => {
    if (path !== '/products' && path !== '/') setSearchQuery('');
  }, [path]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query.trim() && path !== '/products') navigate('/products');
  };

  let page;
  switch (route.key) {
    case '/':
      page = <HomePage searchQuery={searchQuery} />;
      break;
    case '/products':
      page = <ProductsPage searchQuery={searchQuery} setSearchQuery={setSearchQuery} />;
      break;
    case '/products/:slug':
      page = <ProductDetailPage key={route.product.slug} product={route.product} />;
      break;
    case '/dealership':
      page = <DealershipPage />;
      break;
    case '/about':
      page = <AboutPage />;
      break;
    case '/hampers':
      page = <HampersPage />;
      break;
    case '/contract':
      page = <ContractManufacturingPage />;
      break;
    case '/contact':
      page = <ContactPage />;
      break;
    default:
      page = <NotFoundPage />;
  }

  return (
    <EnquiryProvider path={route.key}>
      <HeadManager path={path} />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[80] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-amber-400 focus:text-red-950 focus:font-bold">
        Skip to content
      </a>
      <div className="min-h-screen bg-kamal-website-bg text-stone-800 flex flex-col justify-between">
        <div>
          <BrandHeader />
          <Navbar searchQuery={searchQuery} setSearchQuery={handleSearchChange} />
          <main id="main" className="w-full" tabIndex={-1}>
            <Breadcrumbs items={getBreadcrumbs(route)} />
            {page}
          </main>
        </div>
        <Footer />
        <MobileActionBar />
      </div>
    </EnquiryProvider>
  );
}

export default function App({ initialPath }) {
  return (
    <RouterProvider initialPath={initialPath}>
      <Shell />
    </RouterProvider>
  );
}
