import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

const MessageSection = () => {
  useGSAP(() => {
    const textSpan = document.querySelectorAll(".msg-text");
    const textSpanTwo = document.querySelectorAll(".msg-text-two");

    textSpan.forEach((span) => {
      const splitText = new SplitText(span, { type: "chars" });
      gsap.fromTo(
        splitText.chars,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          scrollTrigger: {
            trigger: span,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    textSpanTwo.forEach((span) => {
      const splitText = new SplitText(span, { type: "chars" });
      gsap.fromTo(
        splitText.chars,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          scrollTrigger: {
            trigger: span,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  });

  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full flex md:justify-end justify-center items-center md:px-14 px-5">
        <div className="w-full max-w-4xl text-center">
          <div className="general-title-big">
            <h1 className="msg-text">Bell & Barks</h1>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl msg-text-two text-orange font-medium">
              Where Love Meets Paws
            </h2>
          </div>

          <div className="flex-center md:mt-20 mt-10">
            <div className="max-w-md px-10 flex-center overflow-hidden">
              <p>
                Unleash your love for pets and embrace the joy of companionship with
                Bell & Barks, where you are one adoption away from pure happiness and
                unconditional love.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
