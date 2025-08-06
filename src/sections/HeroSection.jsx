import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import OptimizedImage from "../components/OptimizedImage";

const HeroSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const titleSplit = SplitText.create(".hero-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 1,
    });

    tl.to(".hero-content", {
      opacity: 1,
      y: 0,
      ease: "power1.inOut",
    })
      .to(
        ".hero-text-scroll",
        {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.5",
      )
      .from(
        titleSplit.chars,
        {
          yPercent: 200,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.5",
      );

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "1% top",
        end: "bottom top",
        scrub: true,
      },
    });
    heroTl.to(".hero-container", {
      rotate: 7,
      scale: 0.9,
      yPercent: 30,
      ease: "power1.inOut",
    });
  });

  return (
    <section className="bg-main-bg">
      <div className="hero-container">
        {isTablet ? (
          <>
            {isMobile && (
              <OptimizedImage
                src="/images/hero-bg.png"
                alt="Bell & Barks hero background - Find your perfect pet companion"
                width={1920}
                height={1080}
                priority={true}
                className="absolute bottom-40 size-full object-cover"
              />
            )}
            <OptimizedImage
              src="/images/hero-img.png"
              alt="Happy pets waiting for adoption at Bell & Barks"
              width={800}
              height={600}
              priority={true}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 object-auto"
            />
          </>
        ) : (
          <video
            src="/videos/hero-bg.mp4"
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            width="1920"
            height="1080"
            className="absolute inset-0 w-full h-full object-cover"
            aria-label="Background video of happy pets"
          />
        )}
        <div className="hero-content opacity-0">
          <div className="overflow-hidden">
            <h1 className="hero-title">Find Your Perfect</h1>
          </div>
          <div
            style={{
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            }}
            className="hero-text-scroll"
          >
            <div className="hero-subtitle">
              <h1>Companion Today</h1>
            </div>
          </div>

          <h2>
            Discover unconditional love with Bell & Barks: Find your perfect
            furry friend and experience the joy of pet companionship.
          </h2>

          <div className="hero-button">
            <p>Adopt a Pet</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
