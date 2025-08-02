import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HomePage from "./pages/HomePage";
import PetCategoryPage from "./pages/PetCategoryPage";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pets/:categoryName" element={<PetCategoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
