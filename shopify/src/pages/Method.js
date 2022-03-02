
import React, { useEffect, useContext ,useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/button'
import { ShopifyContext } from '../ShopifyContext'

const Method = () => {
    const navigate = useNavigate();

    const { cart, fetchCart, getShippingMethod, res, updateShipping} = useContext(ShopifyContext);

    const[shipping, setShipping] = useState(cart.shippingLine.handle);

    useEffect(() => {
        getShippingMethod();
        fetchCart();
    }, [getShippingMethod, fetchCart]);


   const updateShpping = async(handle) =>{
    setShipping(handle);
    await updateShipping(handle)
    await fetchCart();
   }


    const navigateToPayment = async () => {
        navigate('/payment');
    }

    return (
        <div>
            <div style={{ marginTop: "10px" }}>
                <h1>Shipping Info</h1>
                <br />
                <div class="container" style={{ border: "2px solid grey" }}>
                    <p className="para">Name : {cart?.shippingAddress?.firstName} {cart?.shippingAddress?.lastName}, Phone No : {cart?.shippingAddress?.phone} <br/>  Address1 : {cart?.shippingAddress?.address1},
                        Address2 : {cart?.shippingAddress?.address2} <br />
                        Country : {cart?.shippingAddress?.country}({cart?.shippingAddress?.countryCode}), Province : {cart?.shippingAddress?.province}({cart?.shippingAddress?.provinceCode}), City : {cart?.shippingAddress?.city}, ZIP : {cart?.shippingAddress?.zip}

                    </p>
                </div>

            </div>
            <p></p>
            <p></p>

            <div class="container" style={{ border: "2px solid grey" }}>
                {res?.availableShippingRates?.shippingRates?.map(x => (
                    <div class="row" style={{ margin: "5px" }}>
                        <div class="col-sm-1">
                            <input type="radio" checked={x.handle===shipping} onClick={() => updateShpping(x.handle)} radioGroup='a' />
                        </div>
                        <div class="col-sm-3">
                            <span><b>{x.title}</b></span>
                        </div>
                        <div class="col-sm-3">
                            <span><b>{x.priceV2.amount}</b></span>
                        </div>
                    </div>))}
                <div >
                   </div>
            </div>
             <Button onClick={() => navigateToPayment()}> Procced to Payment</Button>
                
        </div >
    )
}

export default Method
