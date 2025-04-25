import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import LoadingSpinner from "../components/LoadingSpinner";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "../styles/gallery.module.scss";

interface ImageData {
  src: string;
  alt: string;
}

const Gallery = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageFiles = Array.from({ length: 32 }, (_, i) => ({
          src: `/images/${i + 1}.webp`,
          alt: `Image ${i + 1}`
        }));
        setImages(imageFiles);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  if (isLoading) {
    return <LoadingSpinner progress={0} />;
  }

  return (
    <div className={styles.gallery}>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className={styles.swiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <motion.div
              className={styles.imageContainer}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={styles.image}
                loading="lazy"
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
