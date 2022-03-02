import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import Header from './pages/Header';
import Footer from './pages/Footer';
import Content from './pages/Content';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
   </div>
  );
}

export default App;
