import React, {useState, useContext} from 'react'
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/button'
import { ShopifyContext } from '../ShopifyContext';



const Login = () => {
    

    const {login} = useContext(ShopifyContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const navigateTOCart = async ()=>{
    //    const res = await fetch('http://localhost:8080/users/');
    //    const users = await res.json();
    //    const user = users.filter(xyz => xyz.username==username);
    //    if(user[0]!==undefined){
          navigate("/Home")
       }


    const appLogin = async()=>{
      const res = await login(email, password);
      if(res!=undefined && res?.data?.customerAccessTokenCreate?.customerAccessToken?.accessToken!=undefined){
        localStorage.setItem("auth-token",res.data.customerAccessTokenCreate.customerAccessToken.accessToken)
        navigate("/Home")
      }
      else{
          alert("Invalid Username or Password")
      }
    }

    return (
        <form><br/>
          <h2 style={{textAlign: 'center'} }>Login</h2>
        <div className="container">
        
        <br/>
            <label><b>User Name :</b></label>
            <input type="text" placeholder=" Enter User Name" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br/>
            <label><b>Password :</b></label>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <br/>


            <div  class =" col">
            
            <Button  style={{ height: "35px",backgroundColor: "rgb(84, 138, 238)", margin:"30px"}}  onClick={appLogin}>Login</Button>
            
            </div>
            <div class="col" style={{marginBottom:"60px"}}>
                    <Link to="/signup" Button >New User (Register Now)  </Link><br/>
                    </div>
        </div>
        </form>
    )
}

export default Login
