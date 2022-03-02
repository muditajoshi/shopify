import React, { useContext, useEffect } from 'react'
import { ShopifyContext } from '../ShopifyContext'
import { Link, useParams, useNavigate } from 'react-router-dom'
import img from './shopping.jpg'

const Home = () => {
    const navigator = useNavigate();
    const { fetchAllProducts, products } = useContext(ShopifyContext);
    useEffect(() => {
        fetchAllProducts()
        return () => { }
    }, [fetchAllProducts])

        return (
        <div>
            <div style={{ overflowY: "auto" }}>
                <img style={{ display: "inside", height: "60vh", width: "90%"}} src={img} />
            </div>

            <div class="container">
                <div class="row">
                    <h2>Trending Products</h2>

                </div>
                <div class="row" >
                    {products.map(product => (
                        <div class="col-sm-3" >
                            <div >
                                <div class="row" style={{ height: "20vh", marginTop: "20px" }} 
                                onClick={() => navigator(`/product/${product.handle}`)}>
                                    <img style={{ display: "block", height: "100%", width: "80%" }} src={product.images[0].src} />
                                </div>
                                <div class="row">
                                    <p><b>{product.title}</b></p><br />
                                    <p><b>Price: $ {product.variants[0].price}</b></p>
                                </div>
                            </div>
                        </div>))}
                </div>
            </div>
        </div>
    )

}


export default Home;
