"use client";
import { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TEXT } from "@/app/utils/Text";
import Header from "../../layout/Header";

//------function for home page slider section----------
export default function HomeSlider() {
  const slides = useMemo(() => [
    {
      id: 1,
      image: "/healthcare-team-consulting-patient.webp",
      heading: TEXT.WELCOME,
      sub: TEXT.AI_PLATFORM,
    },
    {
      id: 2,
      image: "/healthcare-background.webp",
      heading: TEXT.WELCOME,
      sub: TEXT.AI_PLATFORM,
    },
  ]);

  return (
    <div>
      <section className="relative w-full h-screen">
        {/* Header section */}
        <Header />

        <Slider
          autoplay
          infinite
          arrows
          autoplaySpeed={4000}
          speed={700}
          slidesToShow={1}
          slidesToScroll={1}
          pauseOnHover={false}
          className="w-full h-screen"
        >
          {slides.map((s) => (
            <div key={s.id}>
              <div
                className="relative w-full h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${s.image})` }}
              >
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 flex items-center h-full">
                  <div className="section-container">
                    <div className="text-white max-w-[700px] font-extrabold sm:text-[56px] text-[30px] text-center sm:text-left">
                      <h1>
                        {s.heading}
                        <span className="text-(--orange)">
                          {TEXT.SOPHIA.toUpperCase()}
                        </span>
                      </h1>
                      <p>{s.sub}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
}
