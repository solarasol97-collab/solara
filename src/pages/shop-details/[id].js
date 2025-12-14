import Link from "next/link";
import React, { useEffect, useState } from "react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Breadcrumb from "../../components/common/Breadcrumb";
import BackButton from "../../components/common/BackButton";
import Layout from "../../layout/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

function ShopDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState(null);
  const [selected, setSelected] = useState([]);
  const api = process.env.NEXT_PUBLIC_API_BASE_URL;


  const ingredients = [
  "Ramen noodles",
  "Kimchi powder",
  "Chili flakes",
  "Dried vegetables",
  "Seaweed",
];

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await axios.get(`/api/products/${id}`);
          setProduct(res.data);
        } catch (error) {
          console.error("Failed to fetch product details:", error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const relatedproduceSlider = {
    slidesPerView: "auto",
    spaceBetween: 25,
    loop: true,
    speed: 1500,
    autoplay: {
      delay: 2000,
    },
    navigation: {
      nextEl: ".next-btn-4",
      prevEl: ".prev-btn-4",
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 3,
      },
      1600: {
        slidesPerView: 3,
      },
    },
  };

  // Fallback image if product.images is not available
  // const productImage = product?.images[0]?.url || "/assets/images/placeholder.png";

  const handleAddToCart = () => {
    // 1) Get existing cart or start fresh
    const stored = localStorage.getItem("cartItems");
    console.log(stored,'stored')
    const cartItems = stored ? JSON.parse(stored) : [];
   console.log(product,'product')
    const existingIndex = cartItems.findIndex(
      (item) => {
       console.log(item,'item cart')
        return item.product.id === product.id
       }
      );

    if (existingIndex > -1) {
      cartItems[existingIndex].quantity = count;
    } else {
      cartItems.push({
        product,
        quantity: count,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    toast.success("Product added to cart successfully");
  };

  const toggleIngredient = (ingredient) => {
    setSelected((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  return (
    <Layout
      showFooter={false}
      isCustomHeader={true}
      customHeaderClass="customHeaderStyle"
      mobileViewClass="order-page-mobile-width"
    >
      <div className="shop-details pt-120">
        <div className="container">
          <div style={{ marginBottom: '1rem' }}>
            <BackButton />
          </div>
          <div className="row">
          {/* <div className="row"> */}
            {/* <div className="col-lg-5 col-md-12 col-sm-12">
              <div className="tab-content tab-content1" id="v-pills-tabContent">
                <div
                  className="tab-pane fade active show"
                  id="v-pills-img1"
                  role="tabpanel"
                  aria-labelledby="v-pills-img1-tab"
                >
                  <div className="gallery-big-image">
                    <img
                      className="img-fluid w-100"
                      src={product?.images[0]?.url}
                      alt={product?.name || "Product Image"}
                    />
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-img2"
                  role="tabpanel"
                  aria-labelledby="v-pills-img2-tab"
                >
                  <img
                    className="img-fluid w-100"
                    src={product?.images[0]?.url}
                    alt={product?.name || "Product Image"}
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-img3"
                  role="tabpanel"
                  aria-labelledby="v-pills-img3-tab"
                >
                  <img
                    className="img-fluid w-100"
                    src={product?.images[1]?.url}
                    alt={product?.name || "Product Image"}
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-img4"
                  role="tabpanel"
                  aria-labelledby="v-pills-img4-tab"
                >
                  <img
                    className="img-fluid w-100"
                    src={product?.images[2]?.url}
                    alt={product?.name || "Product Image"}
                  />
                </div>
              </div>
             
            </div> */}
            <div className="col-lg-5 col-md-12 col-sm-12">
              <div style={{ position: "sticky", top: "100px" }}>
                <div className="tab-content tab-content1" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade active show"
                    id="v-pills-img1"
                    role="tabpanel"
                    aria-labelledby="v-pills-img1-tab"
                  >
                    <div className="gallery-big-image">
                      <img
                        className="img-fluid w-100"
                        src={product?.images[0]?.url}
                        alt={product?.name || "Product Image"}
                      />
                    </div>
                  </div>

                  {/* Other tab images below */}
                  <div className="tab-pane fade" id="v-pills-img2" role="tabpanel">
                    <img
                      className="img-fluid w-100"
                      src={product?.images[0]?.url}
                      alt={product?.name || "Product Image"}
                    />
                  </div>

                  <div className="tab-pane fade" id="v-pills-img3" role="tabpanel">
                    <img
                      className="img-fluid w-100"
                      src={product?.images[1]?.url}
                      alt={product?.name || "Product Image"}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7 col-md-12 col-sm-12" style={{maxWidth:'max-content'}}>
              <div className="prod-details-content">
     
                <h2>{product?.name || "Product Name"}</h2>
                <div className="price-tag">
                  <h4 style={{color:'#059669'}}>
                    ${product?.price || "N/A"}
                  </h4>
                </div>
                <p>{product?.description || "No description available"}</p>
                <hr/>

    <div style={{color:'#0f172a'}}>
      <h6>Customized Ingredients</h6>
      {ingredients?.map((ingredient, index) => (
        <div key={index} style={{display:'flex', gap:'3%', paddingBottom:'5px'}}>
          <input
            type="checkbox"
            id={`ingredient-${index}`}
            checked={selected.includes(ingredient)}
            onChange={() => toggleIngredient(ingredient)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label
            htmlFor={`ingredient-${index}`}
            className="text-sm text-gray-700"
            style={{cursor:'pointer'}}
          >
            {ingredient}
          </label>
        </div>
      ))}
    </div>
     <div className="category-tag">
                  <ul>
                    <li>Category:</li>
                    <li>
                      {/* <Link legacyBehavior href=""> */}
                        <a>{product?.category?.name || "N/A"}</a>
                      {/* </Link> */}
                    </li>
                  </ul>
                  <ul className="wp-block-tag-cloud">
                    <li>Tags:</li>
                    {product?.tags?.map((item, index) => (
                      <li key={index}>
                        {/* <Link legacyBehavior href="/shop"> */}
                          <a>{item.name || "N/A"}</a>
                        {/* </Link> */}
                      </li>
                    )) || <li>No tags</li>}
                  </ul>
                </div>
    <hr/>
     <div style={{color:'#0f172a'}}>
      <h6>Recommended Add-ons</h6>
      {ingredients?.map((ingredient, index) => (
        <div key={index} style={{display:'flex', gap:'3%',paddingBottom:'5px'}}>
          <input
            type="checkbox"
            id={`ingredient-${index}`}
            checked={selected.includes(ingredient)}
            onChange={() => toggleIngredient(ingredient)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label
            htmlFor={`ingredient-${index}`}
            className="text-sm text-gray-700"
            style={{cursor:'pointer'}}
          >
            {ingredient} <b style={{color:'#059669' }}>+ $5</b>
          </label>
          
        </div>
      ))}
    </div>
                <div className="prod-quantity d-flex align-items-center justify-content-start mb-20">
                  <div className="quantity d-flex align-items-center">
                    <div className="quantity-nav nice-number d-flex align-items-center">
                      <button onClick={decrement} type="button">
                        <i className="bi bi-dash"></i>
                      </button>
                      <span style={{ margin: "0 8px" }}>{count}</span>
                      <button onClick={increment} type="button">
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  <button legacyBehavior onClick={handleAddToCart}>
                    <a className="primary-btn3">Add to cart</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>
     
       <div className="mt-16 text-center mb-8" style={{color:'#0f172a'}}>
        <h2 className="text-xl font-semibold">Follow Us</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Stay updated with our latest offers, events, and delicious new menu
          items
        </p>
        <div className="d-flex justify-content-center gap-3 pb-5">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            href="https://instagram.com/innoxify"
          >
            <div style={{borderRadius:'5px'}} className="rounded-full bg-background flex items-center justify-center shadow-sm hover:bg-primary/10 transition-all">
              <svg
                stroke="currentColor"
                fill="black"
                stroke-width="0"
                viewBox="0 0 448 512"
                className="text-primary"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
              </svg>
              <span className="sr-only">Instagram</span>
            </div>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            href="https://facebook.com/innoxify"
          >
            <div style={{borderRadius:'5px'}} className="rounded-full bg-background flex items-center justify-center shadow-sm hover:bg-primary/10 transition-all">
              <svg
                stroke="currentColor"
                fill="black"
                stroke-width="0"
                viewBox="0 0 512 512"
                className="text-primary"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </div>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            href="https://twitter.com/innoxify"
          >
            <div style={{borderRadius:'5px'}} className="rounded-full bg-background flex items-center justify-center shadow-sm hover:bg-primary/10 transition-all">
              <svg
                stroke="currentColor"
                fill="black"
                stroke-width="0"
                viewBox="0 0 512 512"
                className="text-primary"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </div>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            href="https://linkedin.com/company/innoxify-solutions"
          >
            <div style={{borderRadius:'5px'}} className="rounded-full bg-background flex items-center justify-center shadow-sm hover:bg-primary/10 transition-all">
              <svg
                stroke="currentColor"
                fill="black"
                stroke-width="0"
                viewBox="0 0 448 512"
                className="text-primary"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
              </svg>
              <span className="sr-only">LinkedIn</span>
            </div>
          </a>
        </div>
      </div>
    </Layout>
  );
}

export default ShopDetails;
