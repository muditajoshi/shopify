import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Button from 'react-bootstrap/button'
import { useNavigate } from 'react-router-dom';
import { ShopifyContext } from '../ShopifyContext';



const Registration = () => {
    const navigate = useNavigate();

    const { signUp } = useContext(ShopifyContext);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');


    const register = async () => {
        await signUp(email, password, firstname, lastname, phone);
        setFirstname('');
        setLastname('');
        setEmail('');
        setUsername('');
        setPassword('');
        setPhone('')
        navigate("/Login")
    }


    const navigateToLogin = async () => {
        navigate("/Login")
    }

    return (
        <div>

            <form>
                <div className="content">

                    <div className="container">
                        <h2 style={{textAlign: 'center'} }>Register</h2> 
                        <br />
                        <label><b>First Name- </b></label>
                        <input type="text" placeholder="Enter First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} /> <br />

                        <label><b>Last Name-</b></label>
                        <input type="text" placeholder="Enter Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} /> <br />

                        <label><b> Email ID-</b></label>
                        <input type="text" placeholder="Enter Email Id" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />

                        <label><b>Username-</b></label>
                        <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} /> <br />

                        <label><b>Password-</b></label>
                        <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />

                        <label><b>Phone No-</b></label>
                        <input type="text" placeholder="Enter Phone No" value={phone} onChange={(e) => setPhone(e.target.value)} />

                        <div class="col"><br />
                            <Button style={{ height: "35px", backgroundColor: "rgb(84, 138, 238)" }} onClick={register}>Register</Button>
                        </div>
                        <br />
                        <div class="col" style={{ marginBottom: "60px" }}>
                            <Link to="/login" Button >Already a User (Login)  </Link><br />
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}


export default Registration