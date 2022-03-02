import { useContext, useEffect, React } from 'react';
import gql from 'graphql-tag';
import { ShopifyContext } from '../ShopifyContext';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/button'



const Payment = () => {

    const navigate = useNavigate();
    const {  res, cart, fetchCart , getShippingMethod,  resp} = useContext(ShopifyContext);

    useEffect(() => {

        fetchCart(localStorage.cart_id);
    }, [fetchCart]);

    useEffect(() => {
        getShippingMethod(localStorage.cart_id)
        return () => {
        }
    }, [getShippingMethod]);
    


    const navigateToConfirm = async () => {
        navigate('/confirm');
    }
   

   
    //   const checkoutQuery = gql`
    //       {
    //           node(id: ${localStorage.cart_id}) {
    //               Checkout {
    //                   totalTax
    //                   taxesIncluded
    //                   taxExempt
    //                   subtotalPrice
    //                   totalPrice
    //                   email
    //                   createdAt
    //                   requiresShipping
    //               }
    //           }
    //       }
    //   `;
    

    //   useEffect(() => {

    //       getApolloQueryResponse(checkoutQuery);

    //   }, [ getApolloQueryResponse, checkoutQuery ]);

    console.log(res);

    return (




        <div class="container">
            <div class="row">
                <h1>Payment</h1>
                <p>All transaction are secure and encrrypted</p>

                <div style={{ marginTop: "10px" }}>
                    <div class="container">
                        <div class="row" style={{ border: "2px solid grey", marginTop: "10px" }}>
                            <h4>Billing Address </h4>
                            <p className="para"> Name : {cart?.shippingAddress?.firstName} {cart?.shippingAddress?.lastName}, Phone No : {cart?.shippingAddress?.phone} 
                             , Address1 : {cart?.shippingAddress?.address1}, Address2 : {cart?.shippingAddress?.address2}
                             <br/>Country : {cart?.shippingAddress?.country}({cart?.shippingAddress?.countryCode}), State : {cart?.shippingAddress?.province}({cart?.shippingAddress?.provinceCode}), City : {cart?.shippingAddress?.city}, ZIP : {cart?.shippingAddress?.zip} 
                            </p>
                        </div>





                        <div class="row" id="Credit Card" style={{ border: "2px solid grey", marginTop: "10px" }}>
                      
                            <label>    <input type="radio" radioGroup='a' /><b>Credit Card</b></label>
                            <div >
                                <label> <b>Enter card number : </b> <input type="text" placeholder="XXXX XXXX XXXX" style={{ width: "60%" }}></input></label>
                            </div>

                            <div>
                                <label> <b>Enter Name on card : </b><input type="text" placeholder="John" style={{ width: "60%" }} /> </label>
                            </div>
                            <div>
                                <label> <b>Enter Expiration date : </b><input type="text" placeholder=" MM/YY" style={{ width: "60%" }}></input> </label>
                            </div>
                            <div>
                                <label> <b>Enter Security code : </b> <input type="text" placeholder="CVV/CVC" style={{ width: "60%" }}></input></label>
                            </div>






                        </div>

                        <div class="row" style={{ border: "2px solid grey", marginTop: "10px", height: "20%" }}>
                            <div class="row">
                            <h4>Price Details</h4>
                                <span><b>Sub Total : {cart.subtotalPrice} </b></span>
                            </div>
                            <div class="row">
                                <span><b>Shipping charges : {cart.shippingLine?.price} </b></span>
                            </div>
                            <div class="row">
                                <span><b>Total Price : {cart.totalPrice}</b></span>
                            </div>

                       </div>



                        <div class="row">
                            <div style={{ marginBottom: "50px", marginTop: "10px" }}>
                                <Button onClick={() => navigateToConfirm()}> Order</Button>
                            </div>
                        </div>
                    </div>
                    <p></p>


                </div>


            </div>
        </div>
    )


}




export default Payment;