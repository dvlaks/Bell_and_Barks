import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Suspense, lazy } from "react";
import HomePage from "./pages/HomePage";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load PetCategoryPage for better performance
const PetCategoryPage = lazy(() => import("./pages/PetCategoryPage"));

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  });

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={
          <div className="min-h-screen bg-milk flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-dark-brown mx-auto mb-4"></div>
              <p className="text-dark-brown font-sans text-lg">Loading Bell & Barks...</p>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pets/:categoryName" element={<PetCategoryPage />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
