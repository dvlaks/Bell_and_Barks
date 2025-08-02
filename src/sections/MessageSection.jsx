import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

const MessageSection = () => {
  const sectionRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const descriptionRef = useRef();

  useGSAP(() => {
    // Initial entrance animations
    const textSpan = document.querySelectorAll(".msg-text");
    const textSpanTwo = document.querySelectorAll(".msg-text-two");
    const descText = document.querySelectorAll(".desc-text");

    // Main title animation
    textSpan.forEach((span) => {
      const splitText = new SplitText(span, { type: "chars" });
      gsap.fromTo(
        splitText.chars,
        { 
          opacity: 0, 
          y: 100,
          rotation: -15 
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: span,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Subtitle animation
    textSpanTwo.forEach((span) => {
      const splitText = new SplitText(span, { type: "chars" });
      gsap.fromTo(
        splitText.chars,
        { 
          opacity: 0, 
          scale: 0,
          rotation: 360 
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: span,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Description animation
    descText.forEach((span) => {
      const splitText = new SplitText(span, { type: "words" });
      gsap.fromTo(
        splitText.words,
        { 
          opacity: 0, 
          y: 50,
          skewY: 10
        },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: span,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Crazy hover animations
    const section = sectionRef.current;
    
    // Section hover effect
    section.addEventListener('mouseenter', () => {
      gsap.to(section, {
        background: "linear-gradient(135deg, #fef7ed 0%, #fed7aa 50%, #fdba74 100%)",
        duration: 0.8,
        ease: "power2.inOut"
      });
      
      // Floating particles effect
      gsap.to(".floating-element", {
        y: "random(-20, 20)",
        x: "random(-15, 15)",
        rotation: "random(-10, 10)",
        duration: 2,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    section.addEventListener('mouseleave', () => {
      gsap.to(section, {
        background: "linear-gradient(135deg, #fef7ed 0%, #fef7ed 100%)",
        duration: 0.8,
        ease: "power2.inOut"
      });
      
      gsap.killTweensOf(".floating-element");
      gsap.to(".floating-element", {
        y: 0,
        x: 0,
        rotation: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    });

    // Title hover effect
    if (titleRef.current) {
      titleRef.current.addEventListener('mouseenter', () => {
        const chars = titleRef.current.querySelectorAll('.msg-text span');
        gsap.to(chars, {
          scale: 1.2,
          color: "#ea580c",
          textShadow: "0 10px 20px rgba(234, 88, 12, 0.3)",
          duration: 0.3,
          stagger: 0.02,
          ease: "back.out(1.7)"
        });
      });
      
      titleRef.current.addEventListener('mouseleave', () => {
        const chars = titleRef.current.querySelectorAll('.msg-text span');
        gsap.to(chars, {
          scale: 1,
          color: "#92400e",
          textShadow: "none",
          duration: 0.3,
          stagger: 0.02,
          ease: "power2.out"
        });
      });
    }

    // Subtitle hover effect
    if (subtitleRef.current) {
      subtitleRef.current.addEventListener('mouseenter', () => {
        const chars = subtitleRef.current.querySelectorAll('.msg-text-two span');
        gsap.to(chars, {
          y: -10,
          rotation: "random(-5, 5)",
          scale: 1.1,
          color: "#dc2626",
          duration: 0.4,
          stagger: 0.03,
          ease: "elastic.out(1, 0.6)"
        });
      });
      
      subtitleRef.current.addEventListener('mouseleave', () => {
        const chars = subtitleRef.current.querySelectorAll('.msg-text-two span');
        gsap.to(chars, {
          y: 0,
          rotation: 0,
          scale: 1,
          color: "#ea580c",
          duration: 0.4,
          stagger: 0.03,
          ease: "power2.out"
        });
      });
    }

    // Description hover effect
    if (descriptionRef.current) {
      descriptionRef.current.addEventListener('mouseenter', () => {
        const words = descriptionRef.current.querySelectorAll('.desc-text span');
        gsap.to(words, {
          scale: 1.05,
          color: "#7c2d12",
          duration: 0.3,
          stagger: 0.02,
          ease: "power2.out"
        });
        
        gsap.to(descriptionRef.current, {
          background: "rgba(255, 255, 255, 0.8)",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          duration: 0.5,
          ease: "power2.out"
        });
      });
      
      descriptionRef.current.addEventListener('mouseleave', () => {
        const words = descriptionRef.current.querySelectorAll('.desc-text span');
        gsap.to(words, {
          scale: 1,
          color: "#92400e",
          duration: 0.3,
          stagger: 0.02,
          ease: "power2.out"
        });
        
        gsap.to(descriptionRef.current, {
          background: "transparent",
          padding: "0",
          borderRadius: "0",
          boxShadow: "none",
          duration: 0.5,
          ease: "power2.out"
        });
      });
    }
  });

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden transition-all duration-1000"
      style={{
        background: "linear-gradient(135deg, #fef7ed 0%, #fef7ed 100%)"
      }}
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-8 h-8 bg-orange-200 rounded-full opacity-30"></div>
        <div className="floating-element absolute top-40 right-20 w-6 h-6 bg-red-200 rounded-full opacity-40"></div>
        <div className="floating-element absolute bottom-32 left-20 w-10 h-10 bg-yellow-200 rounded-full opacity-25"></div>
        <div className="floating-element absolute bottom-20 right-10 w-4 h-4 bg-orange-300 rounded-full opacity-35"></div>
        <div className="floating-element absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-r from-orange-200 to-red-200 rounded-full opacity-20"></div>
        <div className="floating-element absolute top-1/3 right-1/3 w-6 h-6 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full opacity-30"></div>
      </div>

      {/* Main content - Centered properly */}
      <div className="w-full flex justify-center items-center px-5 md:px-14 z-10">
        <div className="w-full max-w-6xl text-center space-y-12">
          
          {/* Main Title */}
          <div 
            ref={titleRef}
            className="general-title-big cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <h1 className="msg-text text-6xl md:text-8xl font-bold text-amber-800 tracking-tight">
              Bell & Barks
            </h1>
          </div>

          {/* Subtitle */}
          <div 
            ref={subtitleRef}
            className="cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <h2 className="text-3xl md:text-4xl msg-text-two text-orange-600 font-semibold tracking-wide">
              Where Love Meets Paws
            </h2>
          </div>

          {/* Description */}
          <div className="flex justify-center mt-16">
            <div 
              ref={descriptionRef}
              className="max-w-2xl cursor-pointer transform transition-all duration-500"
            >
              <p className="desc-text text-lg md:text-xl leading-relaxed text-amber-800 font-medium">
                Unleash your love for pets and embrace the joy of companionship with
                Bell & Barks, where you are one adoption away from pure happiness and
                unconditional love.
              </p>
            </div>
          </div>

          {/* Call to action button */}
          <div className="mt-16">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-full overflow-hidden transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
