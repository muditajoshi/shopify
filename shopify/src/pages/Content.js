import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './Content.css'
import Home from './Home'
import Cart from './Cart'
import ProductInfo from './ProductInfo'
import Catalog from './Catalog'
import Address from './Address'
import Payment from './Payment'
import Method from './Method'
import Confirm from './Confirm'
import Search from './Search'
import Login from './Login'
import Registration from './Registration'

class Content extends React.Component {
    render() {
        return (
            // <div className="container">
            <div className="content">
            
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/home' exact element={<Home/>}></Route>
                    <Route path='/login' exact element={<Login/>}></Route>
                    <Route path='/signup' exact element={<Registration/>}></Route>
                    <Route path='/catalog/:handle' exact element={<Catalog/>}></Route>
                    <Route path='/cart' exact element={<Cart/>}></Route>
                    <Route path='/product/:handle' exact element={<ProductInfo/>}></Route>
                    <Route path='/address' exact element={<Address/>}></Route>
                    <Route path='/payment' exact element={<Payment/>}></Route>
                    <Route path='/method' exact element={<Method/>}></Route>
                    <Route path='/confirm' exact element={<Confirm/>}></Route>
                    <Route path='/search' exact element={<Search/>}></Route>
    
                </Routes>
              
            </div>
            
        )
    };
}

export default Content;
