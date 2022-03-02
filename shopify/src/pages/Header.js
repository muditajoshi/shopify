import './header.css';
import { ShopifyContext } from '../ShopifyContext';
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import Select from 'react-select';
import cart from './crt.png';
import Button from 'react-bootstrap/button';



const Header = () => {
  const navigator = useNavigate();
  const [searchKey, setSearchKey] = useState("");


  const { fetchCollections, fetchSearchProducts, collections ,product,fetchProducts } = useContext(ShopifyContext);
  useEffect(() => {
    fetchCollections()
    return () => {           }
  }, [fetchCollections])

  

  const handleChange = (e) => {
    navigator(`/catalog/${e.value}`)
  }

  const handleSearchKeyChange = (e) => setSearchKey(e.target.value);

  // const handlePChange = (e) => {
  //   navigator(`/search/${e.product}`)
  // }

  const searchProducts = ()=>{
    fetchSearchProducts(searchKey);
    setSearchKey("")
    navigator('/search');
  }



  return (

    <div className="header" style={{ backgroundColor: "cornflowerblue" }}>
      <div class="container" style={{ maxWidth: "100%" }} >
        <div class="row">

        </div>
        <div class="row">
          <div class="col-sm-2">
            <Link to="/home" style={{ float: "left", color: "white", marginLeft: "10px", fontSize: "60px", 
            fontFamily: "Brush Script MT, cursive" }}>MStore</Link>
          </div>
          <div class="col-sm-2">
            <Select className="dropdwn" onChange={handleChange} placeholder="Catalog" options={collections}>

            </Select>
          
          </div>
          <div class="col-sm-5">
            
            <div className='searchbar' style={{ marginLeft: "0px"}}>
              <input type="text" style={{verticalAlign:"top", marginTop:"0px", height:"50px", width: "40%"}} placeholder="Search Product" onChange={handleSearchKeyChange}></input>
              <button  type="submit" style={{height:"50px", color:"white", marginTop:"0px", border:"2px solid grey", borderRadius:"15px", backgroundColor:"grey",   width: "15%"}} onClick={searchProducts} placeholder="Catalog">Search</button>
            </div>
            
            </div>
            <div class="col">
                    <Link to="/login" style={{color: "white" ,marginBottom: "0px"}} Button >Login </Link><br/>
                    </div>
          
          <div class="col-sm-2">
            <Link to="/cart" style={{ float: "right", marginTop:"0px", color: "#FAEBD7", marginRight: "20px" }}>
              <img style={{marginTop:"0px"}} src={cart} alt="cartimage"/></Link>
          </div>
        </div>

      </div>

    </div>



  )
}

export default Header;

