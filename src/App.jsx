import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Features from './pages/Features';
import Solutions from './pages/Solutions';
import Pricing from './pages/Pricing';
import Guide from './pages/Guide';
import Demo from './pages/Demo';
import CookiesPrivacy from './pages/CookiesPrivacy';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Demo page without Layout wrapper for full-screen experience */}
        <Route path="/demo" element={<Demo />} />

        {/* Other pages with Layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/features" element={<Layout><Features /></Layout>} />
        <Route path="/solutions" element={<Layout><Solutions /></Layout>} />
        <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
        <Route path="/guide" element={<Layout><Guide /></Layout>} />
        <Route path="/cookies-privacy" element={<Layout><CookiesPrivacy /></Layout>} />

        {/* 404 catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App; 