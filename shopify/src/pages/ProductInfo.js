import { useParams, useNavigate } from 'react-router-dom';
import { ShopifyContext } from '../ShopifyContext';
import React, { useContext, useEffect, useState } from 'react'
import './ProductInfo.css'
import Button from 'react-bootstrap/Button'


const ProductInfo = () => {

  let { handle } = useParams()
  const { fetchProductInfo, getMetaField,addProductToCart, product, imgs , metaField, fetchCart } = useContext(ShopifyContext)

  const navigator = useNavigate();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    fetchProductInfo(handle);
    getMetaField(handle);
  }, [fetchProductInfo,getMetaField, handle]);


  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  }

  const decrementQuantity = () => {
    setQuantity(quantity - 1);
  }

  const addItemToCart = async () => {
    await addProductToCart(product.variants[0].id, quantity)
    navigateToCart();
  }

  const navigateToCart = () => navigator("/cart")
  return (
    <div>
      <div className="container" style={{ height: "50vh" }}>
        <h1>{product.title}</h1>

        {imgs.map(image =>
        (
          <img className="image" src={image.src} alt="productimage" />
        ))}
        <div class="row" style={{ marginTop: "15px" }}>
          <h3>{product.description}</h3>
          {/* <h4>Price: $ {product.variants[0].price}</h4> */}
        </div>
        <div class="row" style={{ marginTop: "15px" }}>
          <h3>Part Number : {metaField}</h3>
          {/* <h4>Price: $ {product.variants[0].price}</h4> */}
        </div>
      </div>

      {/* <div class="container">
      {product.variants.map(item =>
               (
                  <div className="row" style={{ height: "15%", marginTop: "10px",  background: "rgb(238, 232, 232", boxShadow: "4px 3px 8px 1px #969696" }}>
                     <div className="col-sm-3" style={{ height: "15%" }}>
                        <img class="cart-product-img" src={item.image} alt="image" />
                     </div>
                     <div className="col-sm-4" style={{ height: "15%" }}>
                        <div class="row">
                           <span key={item.title}><b>{item.title}</b></span>
                        </div>
                        <div class="row">
                           <span key={item.title}><b>Price: {item.price}</b></span>
                       </div>
                     </div>
                  </div>))} */}



      <div class="container">

        <div class="row">
          <div class="col-sm-5">
            <div style={{ float: "left" }}>
              <Button onClick={decrementQuantity} style={{ backgroundColor: "rgb(84, 138, 238)", width: "50px" }}>-</Button>
              <input type="text" value={quantity} />
              <Button onClick={incrementQuantity} style={{ backgroundColor: "rgb(84, 138, 238)", width: "50px" }}>+</Button>
            </div>
          </div>
          <div class="col-sm-5" >
            <Button type="submit" style={{ float: "right", backgroundColor: "rgb(84, 138, 238)", fontSize: "20px" }} onClick={addItemToCart}>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ProductInfo;
