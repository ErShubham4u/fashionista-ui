import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";

const Section5 = () => {
  return (
    <>
      {/* <section className="sec-padding bg--secondary">
        <div className="container">
          <div className="page-head">
             <span className="page-sub-title">Testimonials</span> 
            <h2 className="page-title">Our Customer Say</h2>
          </div>
        </div>

      
        <div className="container-fluid customer-review-section">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={6}
            spaceBetween={18}
            loop={true}
            autoplay={{ delay: 3000 }}
          >
            {[
              {
                name: "Ronald Dahi",
                width: "60%",
                count: "(3)",
                title: "Excellent Product",
                desc: "Yeah, I am crazy. Ok. May be I am. But I prefer to be crazy than being a dummy.",
              },
              {
                name: "Logan Villeda",
                width: "100%",
                count: "(5)",
                title: "Great",
                desc: "Thumbs Up! 👍",
              },
              {
                name: "Mariam Phegley",
                width: "100%",
                count: "(5)",
                title: "Our Love it. Thanks",
                desc: "There's plenty of money out there. They print more every day. But this ticket, there's only five of them in the whole world.!",
              },
              {
                name: "Joana Soltis",
                width: "100%",
                count: "(5)",
                title: "Love This Product",
                desc: "I love feeding my dog a healthy food that he loves to eat! He has severe food intolerances to red meat and dairy!",
              },
              {
                name: "Francie Maris",
                width: "100%",
                count: "(5)",
                title: "My Favorite Product!",
                desc: "My Favorite Product!",
              },
              {
                name: "Joana Soltis",
                width: "100%",
                count: "(5)",
                title: "Love This Product",
                desc: "I love feeding my dog a healthy food that he loves to eat! He has severe food intolerances to red meat and dairy!",
              },
              {
                name: "Francie Maris",
                width: "100%",
                count: "(5)",
                title: "My Favorite Product!",
                desc: "My Favorite Product!",
              },
              {
                name: "Joana Soltis",
                width: "100%",
                count: "(5)",
                title: "Love This Product",
                desc: "I love feeding my dog a healthy food that he loves to eat! He has severe food intolerances to red meat and dairy!",
              },
              {
                name: "Francie Maris",
                width: "100%",
                count: "(5)",
                title: "My Favorite Product!",
                desc: "My Favorite Product!",
              },
            ].map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="review-item">
                  <Link to={"/Home"} className="review-author-name">
                    {item.name}
                  </Link>
                  <div className="review-ratting">
                    <div
                      className="star-rating"
                      itemProp="reviewRating"
                      itemScope
                      itemType="http://schema.org/Rating"
                      title="Rated 4 out of 5"
                    >
                      <span style={{ width: item.width }} />
                    </div>
                    <Link to={"/Home"} className="product-rating-count">
                      <span className="count">{item.count}</span>
                    </Link>
                  </div>
                  <h5 className="review-title">{item.title}</h5>
                  <p className="review-description">{item.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        
         <div className="container customer-testimonials-section">
          <div className="row">
            <div className="col-lg-8 mx-lg-auto">
              <Swiper
                modules={[Autoplay]}
                className="testimonials-slider"
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 5000 }}
              >
                <SwiperSlide>
                  <div className="testimonials-item">
                    <div className="testimonials-icon">
                      <i className="ti-quote-left" />
                    </div>
                    <p className="testimonials-quote">
                      “There's plenty of money out there. They print more every
                      day. But this ticket, there's only five of them in the
                      whole world, and that's all there's ever going to be. Only
                      a dummy would give this up for something as common money.
                      Are you a dummy?”
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
                      “So, what if, instead of thinking about solving your whole
                      life, you just think about adding additional good things.
                      One at a time. Just let your pile of good things grow”
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

      {/* Blog Section */}
      <section className="sec-padding-t">
        <div className="container">
          <div className="page-head">
            {/* <span className="page-sub-title">New Trends</span> */}
            <h2 className="page-title">New Trends</h2>
          </div>
        </div>
        <div className="container">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={3}
            spaceBetween={18}
            loop={true}
            autoplay={{ delay: 3000 }}
          >
            {[
              {
                img: "img/blog_img/001.jpg",
                tags: ["Fashion", "Cupple"],
                title: "Effective Ways To Overcome Man Fashion’s",
                author: "Admin",
                date: "23 June 2018",
              },
              {
                img: "img/blog_img/002.jpg",
                tags: ["River"],
                title: "Summer Kids Collection Launched 2019",
                author: "Admin",
                date: "15 April 2018",
              },
              {
                img: "img/blog_img/003.jpg",
                tags: ["Women"],
                title: "Huge Saving Limited Offer period",
                author: "User",
                date: "08 March 2018",
              },
              {
                img: "img/blog_img/004.jpg",
                tags: ["Women", "Car"],
                title: "Effective Ways To Overcome Man Fashion’s",
                author: "Admin",
                date: "31 January 2018",
              },
              {
                img: "img/blog_img/005.jpg",
                tags: ["Women"],
                title: "Effective Ways To Overcome Man Fashion’s",
                author: "Admin",
                date: "04 January 2018",
              },
            ].map((post, idx) => (
              <SwiperSlide key={idx}>
                <div className="blog-item">
                  <div className="blog-item-image">
                    <Link to={"/Home"} className="blog-img-link">
                      <img src={post.img} alt="blog image" />
                    </Link>
                  </div>
                  <div className="blog-item-content">
                    <div className="tag">
                      {post.tags.map((tag, i) => (
                        <Link key={i} to={"/Home"}>
                          {tag}
                        </Link>
                      ))}
                    </div>
                    <h4 className="blog-title">
                      <Link to={"/Home"}>{post.title}</Link>
                    </h4>
                    <p className="info">
                      <span>
                        by <Link to={"/Home"}>{post.author}</Link>
                      </span>
                      <span>{post.date}</span>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Section5;
