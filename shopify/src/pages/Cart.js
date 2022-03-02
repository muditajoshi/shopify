import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShopifyContext } from '../ShopifyContext';
import './Cart.css'
import Button from 'react-bootstrap/Button'
import './ProductInfo';
import './Address';

const Cart = () => {

   // const [quantity, setValue] = useState(0);
   // const handleChange = (e) => setValue(e.target.value);

   const [coupon, setCoupon] = useState("");
   const handleCouponChange = (e) => setCoupon(e.target.value);


   const navigate = useNavigate();

   const { fetchCart, cart, removeProduct, updateQuantity, addDiscountCoupon, removeDiscountCoupon } = useContext(ShopifyContext);

   useEffect(() => {
      fetchCart();
   }, [fetchCart])

   const removeProductFromCart = async (cartId, lineItems) => {
      await removeProduct(cartId, lineItems);
   }
   const addDiscountCo = async () => {
      await addDiscountCoupon(cart.id, coupon);
      console.log(coupon);
   }


   const removeDiscountCo = async () => {
      await removeDiscountCoupon(cart.id, coupon);

   }


   // const naviagtetoAddress = async () => {
   //    await updateAddress (ShippingAddress, Address ,updateShippingAddress);
   //    navigate('/address');
   // }
   const naviagtetoAddress = async () => {
      window.location.href = cart.webUrl;
      // await updateAddress (ShippingAddress, Address);
     // navigate('/address');
   }

   const incrementQuantity = async (lineItemId) => {
      let lineItem = cart.lineItems.filter(x => x.id === lineItemId)[0];
      await updateQuantity(cart.id, lineItem.id, lineItem.quantity + 1)
   }

   const decrementQuantity = async (lineItemId) => {
      let lineItem = cart.lineItems.filter(x => x.id === lineItemId)[0];
      if (lineItem.quantity && lineItem.quantity > 0) {
         await updateQuantity(cart.id, lineItem.id, lineItem.quantity - 1)
      }
   }

   //    const Checkut = () =>{

   //       navigate('/address');
   //   };

   return (
      <div class="flex">
         <div class="container">
            {cart?.lineItems?.map(item =>
            (
               <div className="row" style={{
                  height: "15%", marginTop: "10px",
                  background: "rgb(238, 232, 232", boxShadow: "4px 3px 8px 1px #969696"
               }}>
                  <div className="col-sm-2" style={{ height: "25%", width: "25%" }}>
                     <img class="cart-product-img" src={item.variant.image.src} alt="" />
                  </div>
                  <div className="col-sm-3" style={{ height: "15%" }}>
                     <div class="row">
                        <span key={item.title}><b>{item.title}</b></span>

                        <span><b>Price: $ {item.variant.price}</b></span>

                     </div>
                  </div>

                  <div className="col-sm-2" style={{ height: "15%" }}>
                     <Button style={{ backgroundColor: "rgb(84, 138, 238)", width: "30px" }}
                        onClick={() => decrementQuantity(item.id)}>-</Button>
                     <input type="text" value={item.quantity} />
                     <Button style={{ backgroundColor: "rgb(84, 138, 238)", width: "30px" }}
                        onClick={() => incrementQuantity(item.id)}>+</Button>
                  </div>
                  <div className="col-sm-2" style={{ height: "15%" }}>
                     <p><span key={item.title}><b>Total: $ {item?.variant?.price * item?.quantity}</b></span>
                     </p></div>

                  <div className="col-sm-1" style={{ height: "15%" }}>
                     <Button style={{ backgroundColor: "rgb(84, 138, 238)", width: "100px" }}
                        onClick={() => removeProductFromCart(cart.id, [item.id])}>Remove</Button>
                  </div>
               </div>))}
            <br/>
            <div class="row">
               <div class="col-sm-7">
                  <input type="text" value={coupon} onChange={handleCouponChange}></input>
               </div>
               <div class="col-sm-4">
                  <Button style={{ backgroundColor: "rgb(84, 138, 238)", width: "300px" }} onClick={() => addDiscountCo()}> Add Coupon</Button>
               </div>
            </div>
            <br/>
            <div class="row">
               {cart?.discountApplications?.map(coupon => (
                  <div class="col-sm-2" style={{border:"2px solid grey"}}>
                     <div class="row">
                     <span style={{display:"block"}} onClick={removeDiscountCo}><b>X</b></span> <span>{coupon?.code}</span>
                     </div>
                     <div class="row">
                        <span>{coupon?.value?.percentage}% Discount </span>
                     </div>

                  </div>))}

            </div>
                </div>

            <div class="container">
               <div class="row">
                  <span style={{ textAlign: "center" }}><b> Cart Total : $ {cart?.totalPrice}</b></span>
               </div>
               <div class="row">
               </div>
               <div class="col">
                  {/* <Link to="/address">checkout</Link> */}
                  <Button onClick={naviagtetoAddress}>Checkout</Button>
               </div>
            </div>
         </div>
   )
}

export default Cart;