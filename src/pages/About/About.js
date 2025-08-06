import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import Admin_Header from "../Admin/Admin_Header";
import { useGlobalContext } from "../../global/GlobalContext";
import { Link } from "react-router-dom";

const About = () => {
    const NewArivals = "New Arrivals";
  const { isChecked } = useGlobalContext();
  return (
    <div>
      <Header />
      {isChecked ? <Admin_Header /> : null}
      <div className="page-contaiter">
        {/* Breadcrumb */}
        <section className="breadcrumb">
          <div
            className="background-image"
            data-background="img/bg_img/bg_001.jpg"
            data-bg-posx="center"
            data-bg-posy="center"
            data-bg-overlay={4}
          />
          <div className="breadcrumb-content">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h1 className="breadcrumb-title">About Us</h1>
                  <nav className="breadcrumb-link">
                    <span>
                      <a href="/Home">Home</a>
                    </span>
                    <span>About Us</span>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="sec-padding">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-7 col-lg-6 d-flex mb-sm-5">
                <div className="align-self-center">
                  <h2>Welcome to FashionIsta Store...!</h2>
                  <p className="color--dark text--bold">
                    Welcome to Fashionista – your one-stop destination for all
                    things elegant, ethnic, and empowering!
                  </p>
                  <p className="large">
                    At Fashionista, we celebrate womanhood with timeless
                    fashion. From elegant sarees, chic accessories, to exclusive
                    personal products, our collection blends tradition with
                    modern style. Every item is handpicked for quality and
                    elegance, helping every woman feel confident, beautiful, and
                    uniquely herself.
                  </p>

                  <Link
                    to={`/product_listing/${NewArivals}`}
                    className="btn btn-outline-primary btn--sm button"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>

              <div className="col-sm-12 col-md-5 col-lg-6">
                <div className="align-self-center">
                  <p className="color--dark text--bold">
                    Why Choose Fashionista?
                    <br />
                    🛍️ A wide range of carefully selected ladies' fashion items
                    <br />
                    🌸 Unique & personal products that reflect your
                    individuality
                    <br />
                    💫 Easy-to-use shopping experience with fast delivery
                    <br />
                    💖 Made with love, for women, by women
                    <br />
                    <br />
                    Thank you for choosing Fashionista – where tradition meets
                    trend, and style meets soul.
                  </p>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-sm-12 col-md-5 col-lg-10 ">
                <img src="/img/logo/fashionIsta_bg.png" alt="about" />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="sec-padding page-divider-tb">
          <div className="container">
            <div className="page-head">
              <h2 className="page-title">Shopping Team Members</h2>
            </div>

            <Swiper
              modules={[Autoplay]}
              spaceBetween={18}
              slidesPerView={4}
              loop={true}
              autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              }}
            >
              {[
                {
                  name: "Mariam Phegley",
                  role: "Manager",
                  img: "img/products/10/01.jpg",
                },
                {
                  name: "Logan Villeda",
                  role: "Team Leader",
                  img: "img/products/11/01.jpg",
                },
                {
                  name: "Joana Soltis",
                  role: "Designer",
                  img: "img/products/12/01.jpg",
                },
                {
                  name: "Francie Maris",
                  role: "Chairman",
                  img: "img/products/13/01.jpg",
                },
              ].map((member, idx) => (
                <SwiperSlide key={idx}>
                  <div className="product-item">
                    <div className="product-item-img">
                      <a className="product-item-img-link">
                        <img src={member.img} alt={member.name} />
                      </a>
                      <div className="hover-product-icon">
                        <div className="product-icon-btn-wrap">
                          <a href="#" title="Facebook">
                            <i className="ti-facebook" />
                          </a>
                          <a href="#" title="Twitter">
                            <i className="ti-twitter" />
                          </a>
                          <a href="#" title="Google">
                            <i className="ti-google" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="product-item-content">
                      <div className="product-item-title">
                        <span>{member.name}</span>
                      </div>
                      <p className="product-item-price">{member.role}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section> */}

        {/* Testimonials Section */}
        {/* <section className="sec-padding-t">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-lg-auto">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
                  pagination={{ clickable: true }}
                >
                  <SwiperSlide>
                    <div className="testimonials-item">
                      <div className="testimonials-icon">
                        <i className="ti-quote-left" />
                      </div>
                      <p className="testimonials-quote">
                        “There's plenty of money out there. They print more
                        every day. But this ticket, there's only five of them in
                        the whole world, and that's all there's ever going to
                        be. Only a dummy would give this up for something as
                        common money. Are you a dummy?”
                      </p>
                      <div className="testimonials-people">
                        <h6 className="testimonials-people-title">
                          Anthony T. Hincks
                        </h6>
                        <span className="testimonials-people-sub_title">
                          (Apple Founder)
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="testimonials-item">
                      <div className="testimonials-icon">
                        <i className="ti-quote-left" />
                      </div>
                      <p className="testimonials-quote">
                        “So, what if, instead of thinking about solving your
                        whole life, you just think about adding additional good
                        things. One at a time. Just let your pile of good things
                        grow”
                      </p>
                      <div className="testimonials-people">
                        <h6 className="testimonials-people-title">
                          Nicki Golden
                        </h6>
                        <span className="testimonials-people-sub_title">
                          (Microsoft Ceo)
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </section> */}

        {/* Brand Slider */}
        {/* <section className="sec-padding">
          <div className="container">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={10}
              slidesPerView={6}
              loop={true}
              autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
              breakpoints={{
                0: { slidesPerView: 2 },
                576: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                992: { slidesPerView: 5 },
                1200: { slidesPerView: 6 },
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((num, idx) => (
                <SwiperSlide key={idx}>
                  <div className="brand-item">
                    <a>
                      <img
                        src={`img/brand/00${num}.png`}
                        alt={`brand-${num}`}
                      />
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section> */}
      </div>
      <Footer />
    </div>
  );
};

export default About;
