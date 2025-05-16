import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './App.css';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import HeroSection from './Components/Hero/HeroSection';
import Produto from './Components/Produto/Produto';
import { CartProvider } from './context/CartProvider';
import { AddressProvider } from './context/AddressContext';

const App = () => {

  return (
    <div className="App">
      <AddressProvider>
        <CartProvider>
          <Navbar />
          <HeroSection />
          <Produto />
          <Footer />
        </CartProvider>
      </AddressProvider>
    </div>
  );
};

export default App;