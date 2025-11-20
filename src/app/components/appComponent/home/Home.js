import HomeSlider from "./HomeSlider";
import HomeAboutSection from "./HomeAboutSection";
import HomeRoleSection from "./HomeRoleSection";

//------function for home page----------
export default function Home() {
  return (
    <div>
      {/* Hero with Carousel */}
      <HomeSlider />
      <div className="section-container flex justify-between items-start gap-2 py-4 sm:py-9 max-[500px]:flex-col">
        <div className="w-1/2 max-[500px]:w-full">
          <p className="font-semibold max-[430px]:text-[16px] text-[22px] text-(--lightBlack)">
            Trusted Care
          </p>
          <h1 className="font-bold max-[430px]:text-[18px] text-[40px] lg:text-[64px] leading-[47px] lg:leading-[70px] text-(--lightBlack)">
            Top healthcare solutions
          </h1>
        </div>

        <div className="w-1/2 max-[500px]:w-full">
          <p className="font-normal text-[14px] sm:text-[15px] leading-[25px] text-(--grayshade)">
            Sophia delivers state-of-the-art healthcare technology designed to
            empower physicians, hospitals, and health systems worldwide. From
            AI-driven diagnostics to intelligent workflow automation, our
            solutions are built to reduce administrative burden, improve
            clinical precision, and enhance patient safety. We help healthcare
            providers move faster, think smarter, and care deeper — because
            innovation should always serve humanity.
          </p>
        </div>
      </div>
      {/* home page role section */}
      <HomeRoleSection />

      {/* home page about section */}
      <HomeAboutSection />
    </div>
  );
}
