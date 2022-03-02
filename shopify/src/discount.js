import React, { useContext, useEffect } from 'react'
import { ShopifyContext } from '../ShopifyContext'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Select from 'react-select';
import Button from 'react-bootstrap/Button'


const Discount = () => {
    let { handle } = useParams()
    const { fetchProductInfo, addProductToCart, discount, removeDiscount } = useContext(ShopifyContext)

    const navigator = useNavigate();
    const [price, setPrice] = useState(0);

    const removeDiscountt = async (checkoutId, lineItems) => {
        await removeDiscount(checkoutId, lineItems);
    }


    const handleChange = (e) => {
        navigator(`/discount/${e.value}`)
    }

    return (
        <div>


            <div class="container">
                <div class="row">
                    <h2>Discounts</h2>

                </div>
                <div class="row" >
                    {discount.map(discoount => (
                        <div>
                                    <p><b>{discount.discountcode}</b></p><br />
                                    <p><b>Price: $ {discount.variants[0].price}</b></p>

                                    <div class="col-sm-2">
                                        <input type="text" name="discount" placeholder="Discount "></>
                                        <div className="col-sm-1" style={{ height: "15%" }}>
                                            <Button style={{ backgroundColor: "rgb(84, 138, 238)", width: "100px" }}
                                                onClick={() => removeDiscountt(discount.cartId)}>Remove</Button>
                                        </div>
                                    </Select>
                                </div>
))}
            </div>
        </div>
        </div >
    )

}


export default Discount;
