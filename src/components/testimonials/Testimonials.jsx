import React, { useEffect, useState } from "react";
import "./testimonials.css";
import pb from "../../pocketbase"; // adjust path as needed

// Import Swiper and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const records = await pb.collection("Testimonials").getFullList();
        const formatted = records.map((record) => ({
          id: record.id,
          title: record.title,
          subtitle: record.subtitle,
          comment: record.comment,
          image: pb.files.getURL(record, record.image),
        }));
        setTestimonials(formatted);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="testimonials container section">
      <h2 className="section__title">Clients & Reviews</h2>

      <Swiper
        className="testimonials_container grid"
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        grabCursor={true}
        pagination={{ clickable: true }}
      >
        {testimonials.map(({ id, image, title, subtitle, comment }) => (
          <SwiperSlide className="testimonials__item" key={id}>
            <div className="thumb">
              <img src={image} alt={title} />
            </div>
            <h3 className="testimonials__title">{title}</h3>
            <span className="subtitle">{subtitle}</span>
            <div className="comment">{comment}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
