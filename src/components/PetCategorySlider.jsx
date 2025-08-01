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
        {petCategories.map((pet) => (
          <Link
            key={pet.name}
            to={`/pets/${pet.name.toLowerCase()}`}
            className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${pet.rotation} cursor-pointer group transition-transform hover:scale-105 block`}
          >
            {/* Background */}
            <img
              src={`/images/${pet.color}-bg.svg`}
              alt=""
              className="absolute bottom-0"
            />

            {/* Pet Image Placeholder - Will be replaced with actual pet images */}
            <img
              src={`/images/${pet.color}-drink.webp`}
              alt={pet.name}
              className="drinks"
            />

            {/* Pet Elements/Accessories */}
            <img
              src={`/images/${pet.color}-elements.webp`}
              alt=""
              className="elements"
            />

            {/* Pet Category Name */}
            <h1 className="absolute md:bottom-10 md:left-10 bottom-5 left-5 text-milk md:text-6xl text-3xl font-semibold uppercase tracking-tighter">
              {pet.name}
            </h1>

            {/* Price Range - New Feature */}
            <div className="absolute top-5 right-5 bg-milk/90 backdrop-blur-sm rounded-full px-4 py-2">
              <p className="text-dark-brown font-semibold text-sm md:text-base">
                {pet.priceRange}
              </p>
            </div>

            {/* Description - Appears on Hover */}
            <div className="absolute bottom-20 left-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-milk text-sm md:text-base font-paragraph bg-dark-brown/80 backdrop-blur-sm rounded-lg p-3">
                {pet.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PetCategorySlider;
