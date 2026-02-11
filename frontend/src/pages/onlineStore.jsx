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
import cardItems from '../assets/images/ins1.webp';
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
      image: cardItems,
      discount: "50% off",
      title: "August Gift Voucher",
      time: "30:2:23",
      coupon: "AUGUST24",
      condition: "This coupon applies when shopping more than $2000"
    },
    {
      id: 2,
      image: cardItems,
      discount: "30% off",
      title: "Festival Special",
      time: "15:10:05",
      coupon: "FEST30",
      condition: "Valid on orders above $1000"
    }
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
      <Outlet></Outlet>
    </div>
  );
}
