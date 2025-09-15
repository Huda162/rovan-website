import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import i18n from "i18next";
import { useSelector } from "react-redux";
import './styles.css';

export default function CategoriesSection({ categories, handleClick }) {
  const lang = localStorage.getItem("i18nextLng");
  const cart = useSelector((state) => state.cart.value);
  const scrollTimeout = useRef(null);

  const handleClickDesk = (categoryName) => {
    const element = document.getElementById(categoryName);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="categories-section-wrapper w-full py-5 relative overflow-hidden bg-[#f8f5f2]">
      <div className="absolute inset-0 overflow-hidden opacity-15 pointer-events-none">
        <svg 
          className="w-full h-full"
          viewBox="0 0 1200 800" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M-100,200 C200,50 400,350 700,200 C1000,50 1200,350 1500,200" 
            stroke="#eeae49"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
          
          <path 
            d="M-50,350 C250,200 450,500 750,350 C1050,200 1250,500 1550,350" 
            stroke="#eeae49"
            strokeWidth="6"
            fill="none"
            strokeDasharray="8,6"
            strokeLinecap="round"
          />
          
          <path 
            d="M0,450 C300,300 500,600 800,450 C1100,300 1300,600 1600,450" 
            stroke="#eeae49"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          
          <path 
            d="M-80,550 C220,400 480,700 780,550 C1080,400 1280,700 1580,550" 
            stroke="#eeae49"
            strokeWidth="4"
            fill="none"
            strokeDasharray="12,8"
            strokeLinecap="round"
          />
          
          <path 
            d="M-120,650 C180,500 420,800 720,650 C1020,500 1220,800 1520,650" 
            stroke="#eeae49"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      <div className="container-x mx-auto relative z-10">
        
        <div className="w-full categories-iems">
          <div className="xl:grid xl:grid-cols-6 hidden grid-cols-3 gap-8 mb-12">
            {categories?.map((item) => (
              <div
                key={item.id}
                onClick={() => handleClickDesk(item.id)}
                className="cursor-pointer group"
              >
                <div className="item w-full transition-all duration-300 hover:scale-105">
                  <div className="w-full flex justify-center">
                    <div className="w-[110px] h-[110px] rounded-full overflow-hidden relative border-4 border-white shadow-lg group-hover:border-[#eeae49] transition-colors duration-300">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        alt={item.name_en}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full group-hover:bg-opacity-70 transition-all duration-300">
                        <p className="text-white font-bold text-center px-2 text-sm md:text-base">
                          {lang === "ar"
                            ? item.name_ar
                            : lang === "en"
                            ? item.name_en
                            : item.name_he}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="xl:hidden ">
            <Swiper
              modules={[Autoplay, FreeMode, Pagination]}
              spaceBetween={20}
              slidesPerView={3}
              freeMode={true} 
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              speed={2000}
              pagination={{ clickable: true }}
              breakpoints={{
                480: { slidesPerView: 3 },
                600: { slidesPerView: 2 },
                768: {
                  slidesPerView: 5,
                  freeMode: {
                    momentum: true,
                    momentumBounce: false,
                  },
                },
                1366: {
                  slidesPerView: 5,
                  freeMode: {
                    momentum: true,
                    momentumBounce: false,
                  },
                },
              }}
              dir={"rtl"}
            >
              {categories?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="item w-full cursor-pointer group"
                    onClick={() => handleClick(item.id)}
                  >
                    <div className="w-full flex justify-center">
                      <div className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] rounded-full overflow-hidden relative border-4 border-white shadow-lg group-hover:border-[#eeae49] transition-all duration-300">
                        <img
                          src={item.image}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt={item.name_en}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full group-hover:bg-opacity-70 transition-all duration-300">
                          <p className="text-white font-bold text-center px-2 text-xs sm:text-sm">
                            {lang === "ar"
                              ? item.name_ar
                              : lang === "en"
                              ? item.name_en
                              : item.name_he}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

CategoriesSection.propTypes = {
  categories: PropTypes.array.isRequired,
};