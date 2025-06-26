// Carousel.jsx
import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules"; // Import Navigation module

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"; // Import Swiper Navigation styles

import styles from "./Carousel.module.css";
import LeftArrow from "../../assets/LeftArrow.svg"; // Adjust path to your SVG files
import RightArrow from "../../assets/RightArrow.svg"; // Adjust path to your SVG files

// Left Navigation Component
const LeftNav = () => {
  const swiper = useSwiper();
  return (
    <div className={styles.leftNav} onClick={() => swiper.slidePrev()}>
      <img src={LeftArrow} alt="Left Arrow" />
    </div>
  );
};

// Right Navigation Component
const RightNav = () => {
  const swiper = useSwiper();
  return (
    <div className={styles.rightNav} onClick={() => swiper.slideNext()}>
      <img src={RightArrow} alt="Right Arrow" />
    </div>
  );
};

const Carousel = ({ data, renderItem }) => {
  return (
    <div className={styles.carouselContainer}>
      <Swiper
        // Add Navigation module
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={"auto"} // 'auto' works well with responsive breakpoints
        // Add navigation properties to Swiper
        navigation={{
          nextEl: `.${styles.rightNav}`, // Connect to your custom right navigation element
          prevEl: `.${styles.leftNav}`,  // Connect to your custom left navigation element
        }}
        // The breakpoints determine how many slides are visible at different screen sizes
        // Adjust these to ensure desired number of cards are visible.
        // For 7 cards visible, the 1280 breakpoint should be your primary focus.
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          600: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: { // Example: For larger screens, try to fit 7
            slidesPerView: 7,
          },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>{renderItem(item)}</SwiperSlide>
        ))}
        {/* Add custom navigation components inside Swiper */}
        <LeftNav />
        <RightNav />
      </Swiper>
    </div>
  );
};

export default Carousel;