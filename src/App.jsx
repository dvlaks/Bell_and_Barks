import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { Suspense, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HomePage from "./pages/HomePage";
import { LazyPetCategoryPage, initPerformanceMonitoring } from "./utils/performance-optimizations";
import ErrorBoundary from "./components/ErrorBoundary";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-milk">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-light-brown border-t-transparent rounded-full animate-spin"></div>
      <p className="text-dark-brown font-paragraph">Loading Bell & Barks...</p>
    </div>
  </div>
);

const App = () => {
  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  });

  useEffect(() => {
    // Initialize performance monitoring
    initPerformanceMonitoring();
    
    // Report web vitals
    if ('performance' in window) {
      // Measure page load performance
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
      });
    }
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pets/:categoryName" element={<LazyPetCategoryPage />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
