import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import SwiperCore, { Autoplay, EffectFade, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Navigation, Autoplay, EffectFade]);
function Banner1() {
  const bannerSlider = {
    slidesPerView: 1,
    speed: 1200,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    autoplay: true,
    loop: true,
    navigation: {
      nextEl: ".next-btn-1",
      prevEl: ".prev-btn-1",
    },
    pagination: false,
  };

    const currentRoute = useRouter().pathname;
  return (
    <div className="banner-section1">
      <div className="banner-vector">
        <img
          className="vector-top"
          // src="assets/images/icon/shape2.svg"
          src="assets/images/icon/solara-homepage-banner.png"
          alt=""
        />
        {/* <img
          className="vector-btm"
          src="assets/images/icon/shape1.svg"
          alt=""
        /> */}
      </div>

      {/* Mooman's Code */}

      <Swiper {...bannerSlider} className="swiper banner1-slider">
        <div className="swiper-wrapper">
          <SwiperSlide className="swiper-slide">
            {/* <div> */}
            <div className="banner-wrapper d-flex align-items-center justify-content-between">
              {/* <div className="banner-left-img">
                <img src="assets/images/icon/union-left.svg" alt="union-left" />
                <div className="food-img">
                  <img
                    className="img-fluid"
                    src="assets/images/bg/banner-img-1.png"
                    alt="banner-img-1"
                  />
                </div>
              </div> */}
              <div className="banner-content">
                {/* <span>
                  <img
                    className="left-vec"
                    src="assets/images/icon/sub-title-vec.svg"
                    alt="sub-title-vec"
                  />
                  Welcome To Solara
                  <img
                    className="right-vec"
                    src="assets/images/icon/sub-title-vec.svg"
                    alt="sub-title-vec"
                  />
                </span> */}
                <h1>Welcome To Our Resturant</h1>
                <p>
                  Experience delicious meals prepared with fresh ingredients
                </p>
                {currentRoute === "/home" && (
                  <>
                   
                    <Link legacyBehavior href="/shop">
                      <a className="primary-btn2 mx-2" onClick={() => localStorage.setItem("navigationIntent", "browse")}>
                        <i className="bi bi-arrow-up-right-circle" />
                        View Menu
                      </a>
                    </Link>
                    <Link legacyBehavior href="/shop">
                      <a className="primary-btn2 mx-2" onClick={() => localStorage.setItem("navigationIntent", "order")}>
                        <i className="bi bi-arrow-up-right-circle" />
                        Order Online
                      </a>
                    </Link>
                    <Link legacyBehavior href="/reservation">
                      <a className="primary-btn2 mx-2">
                        <i className="bi bi-arrow-up-right-circle" />
                        Reservation
                      </a>
                    </Link>
                  </>
                )}
              </div>
              {/* <div className="banner-right-img">
                <img
                  src="assets/images/icon/union-right.svg"
                  alt="union-right"
                />
                <div className="food-img">
                  <img
                    className="img-fluid"
                    src="assets/images/bg/banner-img-2.png"
                    alt="banner-img-2"
                  />
                </div>
              </div> */}
            </div>
            {/* </div> */}
          </SwiperSlide>
        </div>
        {/* <div className="swiper-btn d-flex justify-content-between align-items-center">
          <div style={{ cursor: "pointer" }} className="prev-btn-1">
            <i className="bi bi-chevron-left" />
          </div>
          <div style={{ cursor: "pointer" }} className="next-btn-1">
            <i className="bi bi-chevron-right" />
          </div>
        </div> */}
      </Swiper>

      {/* Abdul Rehman Code */}

      {/* <Swiper {...bannerSlider} className="swiper banner1-slider"> */}
      {/* <div className="swiper-wrapper"> */}
      {/* <SwiperSlide className="swiper-slide">
            <div className="banner-wrapper d-flex align-items-center justify-content-between">
              <div className="social-area">
                <ul className="m-0 p-0 d-flex align-items-center">
                  <li>
                    <a href="https://www.facebook.com/">Facebook</a>
                  </li>
                  <li>
                    <a href="https://twitter.com/">Twitter</a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/">Instagram</a>
                  </li>
                  <li>
                    <a href="https://www.skype.com/">Skype</a>
                  </li>
                </ul>
              </div>
              <div className="banner-left-img">
                <img src="assets/images/icon/union-left.svg" alt="union-left" />
                <div className="food-img">
                  <img
                    className="img-fluid"
                    src="assets/images/bg/banner-img-1.png"
                    alt="banner-img-1"
                  />
                </div>
              </div>
              <div className="banner-content">
                <span>
                  <img
                    className="left-vec"
                    src="assets/images/icon/sub-title-vec.svg"
                    alt="sub-title-vec"
                  />
                  Welcome To Solara
                  <img
                    className="right-vec"
                    src="assets/images/icon/sub-title-vec.svg"
                    alt="sub-title-vec"
                  />
                </span>
                <h1>Find Your Best Healthy &amp; Tasty Food.</h1>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page.
                </p>
                <Link legacyBehavior href="/about">
                  <a className="primary-btn2">
                    <i className="bi bi-arrow-up-right-circle" />
                    Discover More
                  </a>
                </Link>
              </div>
              <div className="banner-right-img">
                <img
                  src="assets/images/icon/union-right.svg"
                  alt="union-right"
                />
                <div className="food-img">
                  <img
                    className="img-fluid"
                    src="assets/images/bg/banner-img-2.png"
                    alt="banner-img-2"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <div className="banner-wrapper d-flex align-items-center justify-content-between">
              <div className="social-area">
                <ul className="m-0 p-0 d-flex align-items-center">
                  <li>
                    <a href="https://www.facebook.com/">Facebook</a>
                  </li>
                  <li>
                    <a href="https://twitter.com/">Twitter</a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/">Instagram</a>
                  </li>
                  <li>
                    <a href="https://www.skype.com/">Skype</a>
                  </li>
                </ul>
              </div>
              <div className="banner-left-img">
                <img src="assets/images/icon/union-left.svg" alt="union-left" />
                <div className="food-img">
                  <img
                    className="img-fluid"
                    src="assets/images/bg/banner-img-3.png"
                    alt="banner-img-3"
                  />
                </div>
              </div>
              <div className="banner-content">
                <span>
                  <img
                    className="left-vec"
                    src="assets/images/icon/sub-title-vec.svg"
                    alt="sub-title-vec"
                  />
                  Welcome To Solara
                  <img
                    className="right-vec"
                    src="assets/images/icon/sub-title-vec.svg"
                    alt="sub-title-vec"
                  />
                </span>
                <h1>Find Your Best Healthy &amp; Tasty Food.</h1>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page.
                </p>
                <Link legacyBehavior href="/about">
                  <a className="primary-btn2">
                    <i className="bi bi-arrow-up-right-circle" />
                    Discover More
                  </a>
                </Link>
              </div>
              <div className="banner-right-img">
                <img
                  src="assets/images/icon/union-right.svg"
                  alt="union-right"
                />
                <div className="food-img">
                  <img
                    className="img-fluid"
                    src="assets/images/bg/banner-img-4.png"
                    alt="banner-img-4"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide> */}
      {/* <SwiperSlide className="swiper-slide">
            <div className="banner-wrapper d-flex align-items-center justify-content-between"> */}
      {/* <div className="social-area">
                <ul className="m-0 p-0 d-flex align-items-center">
                  <li>
                    <a href="https://www.facebook.com/">Facebook</a>
                  </li>
                  <li>
                    <a href="https://twitter.com/">Twitter</a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/">Instagram</a>
                  </li>
                  <li>
                    <a href="https://www.skype.com/">Skype</a>
                  </li>
                </ul>
              </div> */}
      {/* <div className="banner-left-img">
                <img src="assets/images/icon/union-left.svg" alt="union-left" />
                <div className="food-img">
                  <img
                    className="img-fluid"
                    src="assets/images/bg/banner-img-5.png"
                    alt="banner-img-5"
                  />
                </div>
              </div> */}
      {/* <div className="banner-content">
                <span> */}
      {/* <img
                    className="left-vec"
                    src="assets/images/icon/sub-title-vec.svg"
                    alt="sub-title-vec"
                  /> */}
      {/* Welcome To Solara */}
      {/* <img
                    className="right-vec"
                    src="assets/images/icon/sub-title-vec.svg"
                    alt="sub-title-vec"
                  /> */}
      {/* </span>
                <h1>Find Your Best Healthy &amp; Tasty Food.</h1>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page.
                </p>
                <Link legacyBehavior href="/about">
                  <a className="primary-btn2">
                    <i className="bi bi-arrow-up-right-circle" />
                    Discover More
                  </a>
                </Link>
              </div> */}
      {/* <div className="banner-right-img">
                <img
                  src="assets/images/icon/union-right.svg"
                  alt="union-right"
                />
                <div className="food-img">
                  <img
                    className="img-fluid"
                    src="assets/images/bg/banner-img-5.png"
                    alt="banner-img-5"
                  />
                </div>
              </div> */}
      {/* </div>
          </SwiperSlide>
        </div> */}
      {/* <div className="swiper-btn d-flex justify-content-between align-items-center">
          <div style={{ cursor: "pointer" }} className="prev-btn-1">
            <i className="bi bi-chevron-left" />
          </div>
          <div style={{ cursor: "pointer" }} className="next-btn-1">
            <i className="bi bi-chevron-right" />
          </div>
        </div> */}
      {/* </Swiper> */}
    </div>
  );
}

export default Banner1;
