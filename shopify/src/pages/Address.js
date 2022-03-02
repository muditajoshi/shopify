import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/button'
import { useNavigate } from 'react-router-dom';
import { ShopifyContext } from '../ShopifyContext'



const Address = () => {
    const navigate = useNavigate();
    const { fetchCart, cart,updateShippingAddress  } = useContext(ShopifyContext);


    useEffect(() => {

        fetchCart();
    }, [fetchCart]);
    

    const [firstName, setFirstName] = useState(cart?.shippingAddress?.firstName);
    const [lastName, setLastName] = useState(cart?.shippingAddress?.lastName);
    const [address1, setAddress1] = useState(cart?.shippingAddress?.address1);
    const [address2, setAddress2] = useState(cart?.shippingAddress?.address2);
    const [city, setCity] = useState(cart?.shippingAddress?.city);
    const [province, setProvince] = useState(cart?.shippingAddress?.province);
    const [country, setCountry] = useState(cart?.shippingAddress?.country);
    const [zip, setZip] = useState(cart?.shippingAddress?.zip);
    const [phone, setPhone] = useState(cart?.shippingAddress?.phone);

    
    const updateShippAddr = async() => {


        const shippingAddress = {
            firstName,
            lastName,
            address1,
            address2,
            city,
            province,
            country,
            zip,
            phone
        };

        await updateShippingAddress(localStorage.cart_id, shippingAddress);
        navigate('/Method');

    }

        const navigateToMethod = async() =>{
            // await updateAddress (ShippingAddress, Address);
            navigate('/Method');
        }

        return (


            <div class="container">
                <div class="row">
                    <h1>Shipping Address</h1>
                    <div class="row" id="First Name">
                        <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </div>
                    <div class="row" id="Last Name">
                        <input type="text" placeholder="Last Name"  value={lastName} onChange={e => setLastName(e.target.value)} />
                    </div>
                    <div class="row" id="Address1">
                        <input type="text" placeholder="Address1" value={address1} onChange={e => setAddress1(e.target.value)} />
                    </div>
                    <div class="row" id="Address2">
                        <input type="text" placeholder="Address2" value={address2} onChange={e => setAddress2(e.target.value)} />
                    </div>
                    <div class="row" id="City">
                        <input type="text" placeholder="City" value={city}  onChange={e => setCity(e.target.value)} />
                    </div>
                    <div class="row" id="State">
                        <input type="text" placeholder="State" value={province}  onChange={e => setProvince(e.target.value)} />
                    </div>
                    <div class="row" id="Country">
                        <input type="text" placeholder="Country" value={country}  onChange={e => setCountry(e.target.value)} />
                    </div>
                    <div class="row" id="Zip">
                        <input type="text" placeholder="Zip" value={zip}  onChange={e => setZip(e.target.value)} />
                    </div>
                    <div class="row" id="Phone">
                        <input type="text" placeholder="Phone" value={phone}  onChange={e => setPhone(e.target.value)} />
                    </div>


                    <div class="row">
                            <div style={{ marginBottom: "50px", marginTop: "10px" }}>
                                <Button onClick={updateShippAddr}> Procced to Shipping Method</Button>
                            </div>
                        </div>
                   
                
                </div>

            </div>

        )
    }


export default Address;