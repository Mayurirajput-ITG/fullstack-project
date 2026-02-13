import React, { useEffect, useState } from "react";
import "../assets/onlineStore.css";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiX } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import SlideImg1 from '../assets/images/slider-1.webp'
import cardItems1 from '../assets/images/ins1.webp';
import cardItems2 from '../assets/images/ins2.webp';
import fish from '../assets/images/fish.webp';
import Biscuit from '../assets/images/buscuit.webp';
import Beauty from '../assets/images/beuty.webp';
import Cabbage from '../assets/images/cabbage.webp';
import Cat from '../assets/images/cat.webp';
import Household from '../assets/images/household.webp';
import Jelly from '../assets/images/jelly.webp';
import Drink from '../assets/images/drink.webp';
import Milk from '../assets/images/milk.webp';
import Cookie from '../assets/images/cookie.webp';

import Mint from '../assets/images/mint.webp';
import Orange from '../assets/images/orange.webp';
import Lettuce from '../assets/images/Lettuce.webp';
import Calabaza from '../assets/images/Calabaza.webp';
import Organic from '../assets/images/Organic.webp';
import Pineapple from "../assets/images/Pineapple.webp"
import Corn from '../assets/images/corn.webp';
import Dates from '../assets/images/Dates-Khejur.webp';
import Rainbow from '../assets/images/Rainbow-Chard.webp';
import GreenCauliflower from '../assets/images/Green-Cauliflower.webp';
import FreshDates from '../assets/images/Fresh-Dates.webp';
import GreenLeaf from '../assets/images/Green-Leaf.webp';
import Orange2 from '../assets/images/Orange (2).webp';
import Delivery from '../assets/images/delivery.webp';
import Picture1 from '../assets/images/picture1.webp'
import Picture2 from '../assets/images/picture2.webp'
import Logos from '../assets/images/logos.svg';
import Payment from '../assets/images/payment.webp';
export default function OnlineStore() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isModelOPen, setIsModelOPen] = useState(false);
  const [product, setProducts] = useState([]);

  const handleCartModel = () => {
    setIsModelOPen(true);
    const fetchCartData = async () => {
      try {
        const response = await fetch(`http://localhost:7000/api/cart/${user?.id}`);
        const data = await response.json();

        setProducts(data?.data[0]?.items);
        // setCustomer(data.users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartData();
  }
  console.log(product)
  const handleClose = () => {
    setIsModelOPen(false);
  }
  const handleDeleteCartItem = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:7000/api/cart/${user?.id}/${productId}`,
        { method: "DELETE" }
      );

      const data = await response.json();
      if (data.success) {
        setProducts(data.data.items);
      } else {
        alert("Failed to remove item");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handlePlaceOrder = async () => {
    try {
      if (!product.length) {
        alert("Cart is empty");
        return;
      }
      const orderPayload = {
        customer_id: user?.id,
        customer_name: user?.name,
        items: product.map((item) => ({
          product_id: item.product_id,
          product_name: item.product_name,
          quantity: item.quantity,
          price: item.price,
          total_price: item.price * item.quantity,
        })),
        amount: product.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
        payment_method: "Online",
      };

      const response = await fetch("http://localhost:7000/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();
      if (data.success) {
        alert("Order placed successfully ");
        setIsModelOPen(false);
      } else {
        alert("Failed to place order ");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const offers = [
    {
      id: 1,
      image: cardItems1,
      discount: "50% off",
      title: "August Gift Voucher",
      time: "30:2:23",
      coupon: "AUGUST24",
      condition: "This coupon applies when shopping more than $2000"
    },
    {
      id: 2,
      image: cardItems2,
      discount: "30% off",
      title: "Festival Special",
      time: "15:10:05",
      coupon: "FEST30",
      condition: "Valid on orders above $1000"
    }
  ];
  const categories = [
    {
      id: 1,
      name: "Fish & Meat",
      image: fish,
    },
    {
      id: 2,
      name: "Fruits & Vegetables",
      image: Cabbage,
    },
    {
      id: 3,
      name: "Cooking Essentials",
      image: Cookie,
    },
    {
      id: 4,
      name: "Milk & Dairy",
      image: Milk,
    },
    {
      id: 5,
      name: "Drinks",
      image: Drink,
    },
    {
      id: 6,
      name: "Biscuits & Cakes",
      image: Biscuit,
    },
    {
      id: 7,
      name: "Household Tools",
      image: Household,
    },
    {
      id: 8,
      name: "Pet Care",
      image: Cat,
    }, {
      id: 9,
      name: "Beauty & Healths",
      image: Beauty,
    },
    {
      id: 10,
      name: "Jam & Jelly",
      image: Jelly,
    },
  ];
  const data = [
    {
      id: 1,
      title: "Mint",
      price: 30.78,
      originalPrice: null,
      rating: 2.9,
      reviewCount: 7,
      image: Mint,
      discountPercent: 0,
      hasDiscount: false,
    },
    {
      id: 2,
      title: "Clementine",
      price: 48.12,
      originalPrice: null,
      rating: 3.2,
      reviewCount: 10,
      image: Orange,
      discountPercent: 0,
      hasDiscount: false,
    },
    {
      id: 3,
      title: "Lettuce",
      price: 193.26,
      originalPrice: null,
      rating: 4.0,
      reviewCount: 5,
      image: Lettuce,
      discountPercent: 0,
      hasDiscount: false,
    },
    {
      id: 4,
      title: "Calabaza Squash",
      price: 98.03,
      originalPrice: null,
      rating: 3.0,
      reviewCount: 6,
      image: Calabaza,
      discountPercent: 0,
      hasDiscount: false,
    },
    {
      id: 5,
      title: "Organic Baby Carrot",
      price: 150.00,
      originalPrice: 168.23,
      rating: 4.3,
      reviewCount: 4,
      image: Organic,
      discountPercent: 11,
      hasDiscount: true,
    },
    {
      id: 6,
      title: "Organic Cherry Tomato",
      price: 15.56,
      originalPrice: null,
      rating: 2.2,
      reviewCount: 5,
      image: Orange2,
      discountPercent: 40,
      hasDiscount: false,
    },
    {
      id: 8,
      title: "Yellow Sweet Corn",
      price: 80.97,
      originalPrice: null,
      rating: 2.6,
      reviewCount: 5,
      image: Corn,
      discountPercent: 0,
      hasDiscount: false,
    },
    {
      id: 9,
      title: "Pineapple Imported",
      price: 30.00,
      originalPrice: 46.34,
      rating: 2.9,
      reviewCount: 9,
      image: Pineapple,
      discountPercent: 35,
      hasDiscount: true,
    },
    {
      id: 10,
      title: "Dates Loose",
      price: 102.33,
      originalPrice: null,
      rating: 3.5,
      reviewCount: 6,
      image: Dates,
      discountPercent: 0,
      hasDiscount: false,
    },
    {
      id: 11,
      title: "Rainbow Chard",
      price: 7.07,
      originalPrice: null,
      rating: 3.3,
      reviewCount: 6,
      image: Rainbow,
      discountPercent: 0,
      hasDiscount: false,
    },
    {
      id: 12,
      title: "Green Cauliflower",
      price: 106.49,
      originalPrice: null,
      rating: 3.0,
      reviewCount: 3,
      image: GreenCauliflower,
      discountPercent: 30,
      hasDiscount: false,
    },
    {
      id: 13,
      title: "Fresh Dates",
      price: 106.49,
      originalPrice: null,
      rating: 3.0,
      reviewCount: 3,
      image: FreshDates,
      discountPercent: 0,
      hasDiscount: false,
    },
    {
      id: 14,
      title: "Green Leaf Lettuce",
      price: 106.49,
      originalPrice: null,
      rating: 3.0,
      reviewCount: 3,
      image: GreenLeaf,
      discountPercent: 0,
      hasDiscount: false,
    },
  ];


  return (
    <div class="onlinestore-main-container">
      <div className="navbar">
        <div className="left">
          <div className="logo">BIG BAZAR</div>
          <input className="search" placeholder="Search for products..." />
        </div>

        <div className="right">
          <span className="menu">Categories</span>
          <span className="menu">About Us</span>
          <span className="menu">Contact Us</span>
          <span className="menu red">Offers</span>

          <div className="icons">
            <span className="icon"><BsCart4 onClick={() => { handleCartModel() }}></BsCart4></span>
            <span className="icon"><IoIosNotificationsOutline></IoIosNotificationsOutline></span>
            <span className="icon"><CgProfile></CgProfile></span>
          </div>
        </div>
      </div>
      <div className="main-navabar-2">
        <div className="left-nav">
          <ul>
            <li><a href="#home">Category</a></li>
            <li><a href="#news">About Us</a></li>
            <li><a href="#contact">Contact us</a></li>
            <li><a href="#about">Pages</a></li>
          </ul>
        </div>
        <div className="right-nav">
          <ul>
            <li><a href="#home">English</a></li>
            <li><a href="#news">Privacy Policy</a></li>
            <li><a href="#contact">Terms&Conditions</a></li>

          </ul>
        </div>
      </div>
      <div className="main-container-offer">
        <div className="main-container-left">
          <div className="sliders">
            <img src={SlideImg1} alt="grocery" />
            <div className="slider-content">
              <h2>Best Different Type of Grocery Store</h2>
              <p>Quickly aggregate empowered networks...</p>
              <button>Buy Now</button>
            </div>
          </div>
        </div>
        <div className="main-container-right">
          <div className="right-heading">
            <h3>Latest Super Discount Active Coupon Code</h3>
          </div>
          <div className="right-content">
            {offers.map((item, index) => {
              return (
                <div className="offer-card" key={item?.id}>
                  <div className="offer-card1"><img src={item.image}></img></div>
                  <div className="offer-card2"><p>{item?.discount}</p><p>{item?.title}</p><div><p>{item?.time}</p></div></div>
                  <div className="offer-card3">
                    <button>{item?.coupon}</button>      <div>{item?.condition}</div >
                  </div>
                </div>
              )
            })}
            {/* */}
          </div>
        </div>
      </div>
      <div className="section2">
        <div className="section2-left">
          <div>100% Natural Quality Organic Product </div>
          <p>See Our latest discounted products from here and get a special discount product</p>
        </div>
        <div className="section2-right">
          <button>Buy now</button>
        </div>
      </div>
      <div className="section3">
        <div className="section3-main">
          <div className="section3-heading"><p>Featured Categories</p>
            <div>Choose your necessary products from this feature categories.</div>
          </div>
          <div className="section3-content">
            {categories.map((item) => (
              <div className="section3-box" key={item.id}>
                <div className="section3-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="section3-name">
                  <p>{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section4">
        <div className="section4-main1">
          <div className="section-heading">
            <p>
              Popular Products for Daily Shopping
            </p>
            <div>See all our popular products in this week. You can choose your daily needs products from this
              list and get some special offer with free shipping.</div>
          </div>
          <div className="section-content">
            {/* <div className="section4-grid">
              <div className="section4-grid-img"><img src={Mint}></img></div>
              <div className="section4-grid-text">
                <p>
                  Mint
                </p>
                <p>reviews</p>
                <p>$2w32</p>
              </div>
            </div> */}
            {data.map((item, index) => {
              return (
                <div className="section4-grid" key={item.id}>
                  <div className="section4-grid-img">
                    {item.discountPercent > 0 && <span className="section4-grid-badge">{item?.discountPercent} % Off</span>}
                    <img src={item.image}></img>
                    <button className="section4-quantity-btn"><i class="fa fa-cart-plus" aria-hidden="true"></i></button>
                  </div>
                  <div className="section4-grid-text">
                    <div className="section4-grid-title">
                      <a href="">{item?.title}</a>
                    </div>
                    <div className="section4-grid-review">
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                      <span>{item?.reviewCount}</span>
                    </div>
                    <div className="section4-grid-price">
                      <span>${item?.price}</span>
                    </div>
                    {/* <p>
                      {item?.title}
                    </p>
                    <p>reviews:{item?.reviewCount}</p>
                    <p>${item?.price}</p> */}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="section4-main2">
            <div className="section4-outer-div">
              <div className="section4-inner-div">
                <div className="section4-inner-div-text">
                  <span>Organic Products and Food</span>
                  <h2>Quick Delivery to Your Home</h2>
                  <p>There are many products you will find in our shop, Choose your daily necessary product from our KachaBazar shop and
                    get some special offers. See Our latest discounted products from here and get a special discount.</p>
                  <button>Download</button>
                </div>
                <div className="section4-inner-div-img">
                  <img src={Delivery}></img>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="section5">
        <div className="section5-main">
          <div className="section5-content1">
            <img src={Picture2}></img>
          </div>
          <div className="section5-content2">
            <h3>Get Your Daily Needs From Our KachaBazar Store</h3>
            <p>There are many products you will find in our shop, Choose your daily necessary product
              from our KachaBazar shop and get some special offers.</p>
            <div className="section5-middle-content">
              <a href="https://www.apple.com/app-store/">
                <img alt="app store" src="https://res.cloudinary.com/ahossain/image/upload/v1697688165/settings/app-store_cyyc0f.svg" />
              </a>
              <a href="https://play.google.com/store/games?utm_source=apac_med&amp;utm_medium=hasem&amp;utm_content=Jun0122&amp;utm_campaign=Evergreen&amp;pcampaignid=MKT-EDR-apac-lk-1003227-med-hasem-py-Evergreen-Jun0122-Text_Search_BKWS-BKWS%7CONSEM_kwid_43700071429441653_creativeid_600975795576_device_c&amp;gclid=CjwKCAjwwo-WBhAMEiwAV4dybdy60tnQqCSnQ-cXShNnEcxmaBx2I6iwwc_WEqoA5sN9YSLJEXh9fBoC3u4QAvD_BwE&amp;gclsrc=aw.ds">
                <img alt="play store" src="https://res.cloudinary.com/ahossain/image/upload/v1697688167/settings/play-store_cavwua.svg" />
              </a>
            </div>
          </div>
          <div className="section5-content3">
            <img src={Picture1}></img>
          </div>
        </div>
      </div>
      <div className="section6">
        <div className="section6-main">
          <div className="section6-upper-div">
            <div className="section6-upper-div1"><i class="fa fa-truck" aria-hidden="true"></i><span>Free Shipping From €500.00</span></div>
            <div class="vertical-line"></div>
            <div className="section6-upper-div1"><i class="fa fa-volume-control-phone" aria-hidden="true"></i><span>Support 24/7 At Anytime</span></div>
            <div class="vertical-line"></div>
            <div className="section6-upper-div1"><i class="fa fa-credit-card" aria-hidden="true"></i><span>Secure Payment Totally Safe</span></div>
            <div class="vertical-line"></div>
            <div className="section6-upper-div1"><i class="fa fa-gift" aria-hidden="true"></i><span>Latest Offer Upto 20% Off</span></div>
          </div>
        </div>
      </div>
      <hr className="hr-line"></hr>   
      <div className="section7">
        <div className="section7-main">

          <div className="section7-middle-div">
            <div className="section7-middle-div1">
              <h3 className="section7-header">Company</h3>
              <ul className="section7-ul">
                <li className="section7-list"><a href="">About Us</a></li>
                <li className="section7-list"><a href="">Contact Us</a></li>
                <li className="section7-list"><a href="">Careers</a></li>
                <li className="section7-list"><a href="">Latest News</a></li>
              </ul>
            </div>
            <div className="section7-middle-div2"><h3 className="section7-header">Latest News</h3>
              <ul className="section7-ul">
                <li className="section7-list"><a href="">Fish & Meat</a></li>
                <li className="section7-list"><a href="">Soft Drink</a></li>
                <li className="section7-list"><a href="">Milk & Dairy</a></li>
                <li className="section7-list"><a href="">Beauty & Health</a></li>
              </ul></div>
            <div className="section7-middle-div3"><h3 className="section7-header">My account</h3>
              <ul className="section7-ul">
                <li className="section7-list"><a href="">Dashboard</a></li>
                <li className="section7-list"><a href="">My Orders</a></li>
                <li className="section7-list"><a href="">Recent Orders</a></li>
                <li className="section7-list"><a href="">Update Profile</a></li>
              </ul></div>
            <div className="section7-middle-div4"><img src={Logos}></img>
              <ul className="section7-ul">
                <li className="section7-list"><a href="">987 Andre Plain Suite High Street 838, Lake</a></li>
                <li className="section7-list"><a href="">Hestertown, USA</a></li>
                <li className="section7-list"><a href="">Tel : 02.356.1666</a></li>
                <li className="section7-list"><a href="">Email : ccruidk@test.com</a></li>
              </ul></div>
          </div>
          <div className="section7-below-div">
            <div className="section7-div-grid">
              <div className="section7-below-div1">
                <span class="text-base leading-7 font-medium block mb-2 pb-0.5">Follow Us</span>
                <ul class="text-sm flex">
                  <li className="section7-first-list">
                    <a aria-label="Social Link" rel="noreferrer" target="_blank" class="block text-center mx-auto text-gray-500 hover:text-white" href="https://www.facebook.com/">
                      <svg viewBox="0 0 64 64" width="34" height="34"><circle cx="32" cy="32" r="32" fill="#0965FE"></circle><path d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z" fill="white"></path></svg>
                    </a>
                  </li>
                  <li className="section7-first-list">
                    <a aria-label="Social Link" rel="noreferrer" target="_blank" class="block text-center mx-auto text-gray-500 hover:text-white" href="https://twitter.com/">
                      <svg viewBox="0 0 64 64" width="34" height="34"><circle cx="32" cy="32" r="32" fill="#000000"></circle><path d="M 41.116 18.375 h 4.962 l -10.8405 12.39 l 12.753 16.86 H 38.005 l -7.821 -10.2255 L 21.235 47.625 H 16.27 l 11.595 -13.2525 L 15.631 18.375 H 25.87 l 7.0695 9.3465 z m -1.7415 26.28 h 2.7495 L 24.376 21.189 H 21.4255 z" fill="white"></path>
                      </svg>
                    </a>
                  </li>
                  <li className="section7-first-list">
                    <a aria-label="Social Link" rel="noreferrer" target="_blank" class="block text-center mx-auto text-gray-500 hover:text-white" href="https://www.pinterest.com/">
                      <svg viewBox="0 0 64 64" width="34" height="34"><circle cx="32" cy="32" r="32" fill="#E60023"></circle><path d="M32,16c-8.8,0-16,7.2-16,16c0,6.6,3.9,12.2,9.6,14.7c0-1.1,0-2.5,0.3-3.7 c0.3-1.3,2.1-8.7,2.1-8.7s-0.5-1-0.5-2.5c0-2.4,1.4-4.1,3.1-4.1c1.5,0,2.2,1.1,2.2,2.4c0,1.5-0.9,3.7-1.4,5.7 c-0.4,1.7,0.9,3.1,2.5,3.1c3,0,5.1-3.9,5.1-8.5c0-3.5-2.4-6.1-6.7-6.1c-4.9,0-7.9,3.6-7.9,7.7c0,1.4,0.4,2.4,1.1,3.1 c0.3,0.3,0.3,0.5,0.2,0.9c-0.1,0.3-0.3,1-0.3,1.3c-0.1,0.4-0.4,0.6-0.8,0.4c-2.2-0.9-3.3-3.4-3.3-6.1c0-4.5,3.8-10,11.4-10 c6.1,0,10.1,4.4,10.1,9.2c0,6.3-3.5,11-8.6,11c-1.7,0-3.4-0.9-3.9-2c0,0-0.9,3.7-1.1,4.4c-0.3,1.2-1,2.5-1.6,3.4 c1.4,0.4,3,0.7,4.5,0.7c8.8,0,16-7.2,16-16C48,23.2,40.8,16,32,16z" fill="white"></path>
                      </svg>
                    </a>
                  </li>
                  <li className="section7-first-list">
                    <a aria-label="Social Link" rel="noreferrer" target="_blank" class="block text-center mx-auto text-gray-500 hover:text-white" href="https://www.linkedin.com/">
                      <svg viewBox="0 0 64 64" width="34" height="34"><circle cx="32" cy="32" r="32" fill="#0077B5"></circle><path d="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z" fill="white"></path>
                      </svg></a></li><li class="flex items-center  mr-3 transition ease-in-out duration-500"><a aria-label="Social Link" rel="noreferrer" target="_blank" class="block text-center mx-auto text-gray-500 hover:text-white" href="https://web.whatsapp.com/"><svg viewBox="0 0 64 64" width="34" height="34"><circle cx="32" cy="32" r="32" fill="#25D366"></circle><path d="m42.32286,33.93287c-0.5178,-0.2589 -3.04726,-1.49644 -3.52105,-1.66732c-0.4712,-0.17346 -0.81554,-0.2589 -1.15987,0.2589c-0.34175,0.51004 -1.33075,1.66474 -1.63108,2.00648c-0.30032,0.33658 -0.60064,0.36247 -1.11327,0.12945c-0.5178,-0.2589 -2.17994,-0.80259 -4.14759,-2.56312c-1.53269,-1.37217 -2.56312,-3.05503 -2.86603,-3.57283c-0.30033,-0.5178 -0.03366,-0.80259 0.22524,-1.06149c0.23301,-0.23301 0.5178,-0.59547 0.7767,-0.90616c0.25372,-0.31068 0.33657,-0.5178 0.51262,-0.85437c0.17088,-0.36246 0.08544,-0.64725 -0.04402,-0.90615c-0.12945,-0.2589 -1.15987,-2.79613 -1.58964,-3.80584c-0.41424,-1.00971 -0.84142,-0.88027 -1.15987,-0.88027c-0.29773,-0.02588 -0.64208,-0.02588 -0.98382,-0.02588c-0.34693,0 -0.90616,0.12945 -1.37736,0.62136c-0.4712,0.5178 -1.80194,1.76053 -1.80194,4.27186c0,2.51134 1.84596,4.945 2.10227,5.30747c0.2589,0.33657 3.63497,5.51458 8.80262,7.74113c1.23237,0.5178 2.1903,0.82848 2.94111,1.08738c1.23237,0.38836 2.35599,0.33657 3.24402,0.20712c0.99159,-0.15534 3.04985,-1.24272 3.47963,-2.45956c0.44013,-1.21683 0.44013,-2.22654 0.31068,-2.45955c-0.12945,-0.23301 -0.46601,-0.36247 -0.98382,-0.59548m-9.40068,12.84407l-0.02589,0c-3.05503,0 -6.08417,-0.82849 -8.72495,-2.38189l-0.62136,-0.37023l-6.47252,1.68286l1.73463,-6.29129l-0.41424,-0.64725c-1.70875,-2.71846 -2.6149,-5.85116 -2.6149,-9.07706c0,-9.39809 7.68934,-17.06155 17.15993,-17.06155c4.58253,0 8.88029,1.78642 12.11655,5.02268c3.23625,3.21036 5.02267,7.50812 5.02267,12.06476c-0.0078,9.3981 -7.69712,17.06155 -17.14699,17.06155m14.58906,-31.58846c-3.93529,-3.80584 -9.1133,-5.95471 -14.62789,-5.95471c-11.36055,0 -20.60848,9.2065 -20.61625,20.52564c0,3.61684 0.94757,7.14565 2.75211,10.26282l-2.92557,10.63564l10.93337,-2.85309c3.0136,1.63108 6.4052,2.4958 9.85634,2.49839l0.01037,0c11.36574,0 20.61884,-9.2091 20.62403,-20.53082c0,-5.48093 -2.14111,-10.64081 -6.03239,-14.51915" fill="white"></path>
                      </svg>
                      </a>
                  </li>
                </ul>
              </div>
              <div className="section7-below-div2">
                <p>Call Us</p>
                <h5>+6599887766</h5>
              </div>
              <div className="section7-below-div3">
                <ul>
                  <li><img src={Payment}></img></li>
                </ul>
              </div>
            </div>

          </div>
          <div className="footer">
            <span>Copyright 2026 @ HtmlLover, All rights reserved.s</span>
          </div>
        </div>
      </div>

      {isModelOPen &&
        <div className={`ap-overlay ${isModelOPen ? "show" : ""}`}>
          <div className={`ap-modal ${isModelOPen ? "slide-in" : ""}`}>
            <div className="ap-header">
              <h2>Cart Details</h2>
              <FiX className="ap-close" onClick={() => { setIsModelOPen(false) }} />
            </div>
            <div class="cart-details">
              {product.map((item, index) => {
                return (
                  <div className="cart-product-details">
                    <div className="cart-product-img">
                      <img src={item?.product_img}></img>
                    </div>
                    <div className="cart-product-info">
                      <h5>{item?.product_name}</h5>
                      <p>{item?.category}</p>
                      <p>{item?.price}</p>
                    </div>
                    <div className="cart-product-price">
                      <FiTrash2 className="icon" onClick={() => handleDeleteCartItem(item.product_id)} />
                    </div>
                  </div>

                )
              })}

            </div>
            <div className="cart-footer">
              <button className="place_order_btn" onClick={handlePlaceOrder}>
                Place The Order
              </button>
              <button className="close_btn" onClick={() => { setIsModelOPen(false) }}>close</button>
            </div>
          </div>
        </div>}
      {/* <Outlet></Outlet> */}
    </div>
  );
}
