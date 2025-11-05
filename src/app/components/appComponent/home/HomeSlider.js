"use client";
import { useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TEXT } from "@/app/utils/Text";

export default function HomeSlider() {
  const slides = useMemo(() => [
    {
      id: 1,
      image: "/background.webp",
      heading: TEXT.WELCOME,
      sub: TEXT.AI_PLATFORM,
    },
    {
      id: 2,
      image: "/bg.webp",
      heading: TEXT.WELCOME,
      sub: TEXT.AI_PLATFORM,
    },
  ]);

  return (
    <div>
      {/* Hero with Carousel */}
      <section className="w-full h-[607px]">
        <Slider
          autoplay
          infinite
          arrows
          autoplaySpeed={4000}
          speed={700}
          slidesToShow={1}
          slidesToScroll={1}
          pauseOnHover={false}
          className="w-full h-[607px]"
        >
          {slides.map((s) => (
            <div key={s.id}>
              <div
                className="relative w-full h-[607px] bg-cover bg-center"
                style={{ backgroundImage: `url(${s.image})` }}
              >
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative z-10 flex items-center h-full">
                  <div className="section-container">
                    <div className="text-(--white) max-w-[700px] font-extrabold sm:text-[56px] text-[30px]">
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
