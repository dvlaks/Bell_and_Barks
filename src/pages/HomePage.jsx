import NavBar from "../components/NavBar";
import SEOHead from "../components/SEOHead";
import HeroSection from "../sections/HeroSection";
import MessageSection from "../sections/MessageSection";
import PetSection from "../sections/PetSection";
import NutritionSection from "../sections/NutritionSection";
import BenefitSection from "../sections/BenefitSection";
import TestimonialSection from "../sections/TestimonialSection";
import FooterSection from "../sections/FooterSection";

const HomePage = () => {
  return (
    <main>
      <SEOHead 
        title="Bell & Barks - Find Your Perfect Pet Companion"
        description="Professional pet adoption platform featuring dogs, cats, birds, fish, rabbits, and reptiles. Find your perfect companion today with Bell & Barks premium selection."
        keywords="pet adoption, dogs for adoption, cats for adoption, pet rescue, animal shelter, adopt a pet, pet care"
      />
      <NavBar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection />
          <MessageSection />
          <PetSection />
          <NutritionSection />

          <div>
            <BenefitSection />
            <TestimonialSection />
          </div>

          <FooterSection />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
