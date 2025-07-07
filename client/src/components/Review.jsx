import bg1 from '../assets/slide1.jpg';
import bg2 from '../assets/slide2.jpg';
import bg3 from '../assets/slide3.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


import 'swiper/css';

const reviews = [
  {
    name: 'Thor Odinson',
    comment: 'Amazing experience! Highly recommend this website.',
    image: bg1,
  },
  {
    name: 'Tony Stark',
    comment: 'Support was quick and helpful. Loved the interface!',
    image: bg2,
  },
  {
    name: 'Peter Parker',
    comment: 'I will definitely use this again. Great job postverse!',
    image: bg3,
  },
];

export default function Review(){
    return (
  
    <div className=" w-screen sm:w-[80vw] h-[60vh] mx-auto font-mono">
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="w-full h-full  overflow-hidden"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${review.image})` }}
            >
              <div className="absolute inset-0  bg-black/50 backdrop-blur-xs" />

              <div className="relative z-10 text-center px-6 max-w-xl">
                <h2 className="text-2xl text-white md:text-3xl font-bold mb-4">
                  {review.name}
                </h2>
                <p className="text-lg text-white/60 md:text-xl mb-6">
                  "{review.comment}"
                </p>
                <button className="bg-black/40 text-cyan-300 px-6 py-2 rounded-full font-medium ">
                  Popular
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    )
}