import FlavorTitle from "../components/FlavorTitle";
import PetCategorySlider from "../components/PetCategorySlider";

const PetSection = () => {
  return (
    <section className="pet-category-section">
      <div className="h-full flex lg:flex-row flex-col items-center relative">
        <div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0">
          <FlavorTitle />
        </div>
        <div className="h-full">
          <PetCategorySlider />
        </div>
      </div>
    </section>
  );
};

export default PetSection;
