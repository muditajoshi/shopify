import { ShopifyContext } from '../ShopifyContext';
import React, { useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const Catalog = () => {

  const navigator = useNavigate();

  let { handle } = useParams()

  const { fetchCollectionByHandle, fetchProductInfo, selectedProducts } = useContext(ShopifyContext);
  useEffect(() => {
    fetchCollectionByHandle(handle)
    return () => { }
  }, [fetchCollectionByHandle, handle])

  const navigateToProductinfo = async (handle) => {
    navigator(`/product/${handle}`);
    fetchProductInfo(handle);
  }


  return (
    <div class="container">
      <div class="row" >
        {selectedProducts.map(product => (
          <div class="col-sm-3" >
            <div >
              <div class="row" style={{ height: "20vh", marginTop: "20px" }} onClick={() => navigateToProductinfo(product.handle)}>
                <img style={{ display: "block", height: "100%", width: "100%" }} src={product.images[0].src} />
              </div>
              <div class="row">
                <p><b>{product.title}</b></p><br />
                <p><b>Price: $.{product.variants[0].price}</b></p>
              </div>
            </div>
          </div>))}
      </div>
    </div>
  )
}

export default Catalog;
