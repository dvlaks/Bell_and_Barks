import { useGSAP } from "@gsap/react";
import { petCategories } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const PetCategorySlider = () => {
  const sliderRef = useRef();

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

    if (!isTablet) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".pet-category-section",
          start: "2% top",
          end: `+=${scrollAmount + 1500}px`,
          scrub: true,
          pin: true,
        },
      });

      tl.to(".pet-category-section", {
        x: `-${scrollAmount + 1500}px`,
        ease: "power1.inOut",
      });
    }

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".pet-category-section",
        start: "top top",
        end: "bottom 80%",
        scrub: true,
      },
    });

    titleTl
      .to(".first-text-split", {
        xPercent: -30,
        ease: "power1.inOut",
      })
      .to(
        ".pet-text-scroll",
        {
          xPercent: -22,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".second-text-split",
        {
          xPercent: -10,
          ease: "power1.inOut",
        },
        "<"
      );
  });

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="pet-categories">
        {petCategories.map((pet) => {
          // Map each category to its corresponding image
          const getImagePath = (categoryName) => {
            switch(categoryName.toLowerCase()) {
              case 'dogs': return '/images/dog.jpg';
              case 'cats': return '/images/cat.jpg';
              case 'birds': return '/images/Birds.jpg';
              case 'fish': return '/images/Fish.jpg';
              case 'rabbits': return '/images/Rabbit - Copy.jpg';
              case 'reptiles': return '/images/Reptiles.jpg';
              default: return '/images/dog.jpg'; // fallback to dog image
            }
          };

          return (
            <div
              key={pet.name}
              className={`relative lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${pet.rotation} overflow-hidden rounded-3xl border-4 border-white/20 backdrop-blur-sm shadow-2xl`}
            >
              <Link
                to={`/pets/${pet.name.toLowerCase()}`}
                className="block w-full h-full cursor-pointer group transition-all duration-500 hover:scale-[1.02] relative"
              >
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={`/images/${pet.color}-bg.svg`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Pet Image Container - Properly contained within card */}
                <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
                  <img
                    src={getImagePath(pet.name)}
                    alt={pet.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20"></div>

                {/* Pet Elements/Accessories */}
                <div className="absolute inset-0 z-30">
                  <img
                    src={`/images/${pet.color}-elements.webp`}
                    alt=""
                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                {/* Content Layer */}
                <div className="absolute inset-0 z-40 flex flex-col justify-between p-6 md:p-8">
                  {/* Price Range Badge */}
                  <div className="self-end">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                      <p className="text-dark-brown font-bold text-sm md:text-base whitespace-nowrap">
                        {pet.priceRange}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="space-y-3">
                    {/* Pet Category Name */}
                    <h1 className="text-white drop-shadow-2xl text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight">
                      {pet.name}
                    </h1>

                    {/* Description - Always visible on mobile, hover on desktop */}
                    <div className="md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform md:translate-y-4 md:group-hover:translate-y-0">
                      <p className="text-white/90 text-sm md:text-base font-medium bg-black/40 backdrop-blur-sm rounded-xl p-4 leading-relaxed border border-white/20">
                        {pet.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 z-50 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PetCategorySlider;
