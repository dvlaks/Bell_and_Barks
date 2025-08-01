import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { useParams, Link } from "react-router-dom";
import { petCategories } from "../constants";

const PetCategoryPage = () => {
  const { categoryName } = useParams();
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  // Find the current category data
  const currentCategory = petCategories.find(
    (category) => category.name.toLowerCase() === categoryName?.toLowerCase()
  );

  if (!currentCategory) {
    return <div>Category not found</div>;
  }

  useGSAP(() => {
    const titleSplit = SplitText.create(".category-hero-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 1,
    });

    tl.to(".category-hero-content", {
      opacity: 1,
      y: 0,
      ease: "power1.inOut",
    })
      .to(
        ".category-text-scroll",
        {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.5"
      )
      .from(
        titleSplit.chars,
        {
          yPercent: 200,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.5"
      );

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".category-hero-container",
        start: "1% top",
        end: "bottom top",
        scrub: true,
      },
    });
    heroTl.to(".category-hero-container", {
      rotate: 7,
      scale: 0.9,
      yPercent: 30,
      ease: "power1.inOut",
    });
  });

  return (
    <div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md px-5 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            Bell & Barks
          </Link>
          <Link 
            to="/" 
            className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-main-bg pt-20">
        <div className="category-hero-container">
          {isTablet ? (
            <>
              {isMobile && (
                <img
                  src="/images/hero-bg.png"
                  className="absolute bottom-40 size-full object-cover"
                />
              )}
              <img
                src="/images/hero-img.png"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 object-auto"
              />
            </>
          ) : (
            <video
              src="/videos/hero-bg.mp4"
              autoPlay
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="category-hero-content opacity-0">
            <div className="overflow-hidden">
              <h1 className="category-hero-title">Discover Amazing</h1>
            </div>
            <div
              style={{
                clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
              }}
              className="category-text-scroll"
            >
              <div className="hero-subtitle">
                <h1>{currentCategory.name}</h1>
              </div>
            </div>

            <h2>
              {currentCategory.description} Find your perfect companion today 
              with Bell & Barks premium selection.
            </h2>

            <div className="hero-button">
              <p>Adopt a {currentCategory.name.slice(0, -1)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Details Section */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Choose {currentCategory.name}?
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Perfect Companions</h3>
                  <p className="text-gray-600">
                    {currentCategory.name} make wonderful family pets with their loving nature and loyalty.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Easy Care</h3>
                  <p className="text-gray-600">
                    Our {currentCategory.name.toLowerCase()} come with complete care guides and ongoing support.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Health Guaranteed</h3>
                  <p className="text-gray-600">
                    All our pets are health-checked and come with health guarantees.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/hero-img.png"
                alt={currentCategory.name}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Available Pets Grid */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Available {currentCategory.name}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our selection of beautiful {currentCategory.name.toLowerCase()} 
              ready for their forever homes. Each pet is carefully selected and loved.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Actual pet cards from data */}
            {currentCategory.pets && currentCategory.pets.map((pet, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gray-200 relative overflow-hidden">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {pet.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {pet.age}
                  </p>
                  <p className="text-gray-600 mb-3 text-sm">
                    {pet.description}
                  </p>
                  <p className="text-primary font-semibold mb-4">
                    {pet.price}
                  </p>
                  <button className="w-full bg-primary text-white py-2 rounded-full hover:bg-primary/80 transition-colors">
                    Adopt Me
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Adopt?</h2>
          <p className="text-xl mb-8 opacity-90">
            Take the first step towards finding your perfect companion. 
            Our adoption process is simple and designed to ensure the best match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-primary rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Start Adoption Process
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-primary transition-colors">
              Schedule a Visit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PetCategoryPage;
