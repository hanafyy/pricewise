/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
  {
    imgUrl: "/assets/images/hero-1.svg",
    alt: "smart watch",
  },
  {
    imgUrl: "/assets/images/hero-2.svg",
    alt: "bag",
  },
  {
    imgUrl: "/assets/images/hero-3.svg",
    alt: "lamp",
  },
  {
    imgUrl: "/assets/images/hero-4.svg",
    alt: "air fryer",
  },
  {
    imgUrl: "/assets/images/hero-5.svg",
    alt: "chair",
  },
];

function HeroCarousel() {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={2000}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
      >
        {heroImages.map((image: any, index: number) => (
          <Image
            key={index}
            src={image.imgUrl}
            alt={image.alt}
            width={500}
            height={500}
            className="object-contain"
          />
        ))}
      </Carousel>
    </div>
  );
}

export default HeroCarousel;
