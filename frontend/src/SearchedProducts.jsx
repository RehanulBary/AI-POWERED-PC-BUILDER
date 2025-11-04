import React from 'react';
import { useLocation } from 'react-router-dom';
import Holder from "./components/Holder";
import "./searchedProducts.css";
import Header from './components/Header';
import Footer from './components/Footer';

export default function SearchedProducts() {
    const location = useLocation();
    const { searchedProducts } = location.state || { searchedProducts: [] };

    return (
        <>
            <Header />
            
            <div className='your_search'>Your searched components</div>
            <div className='whole-search'>
                <div className="searchedp">
                    {searchedProducts.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        <Holder products={searchedProducts} />
                    )}
                </div>
                
            </div>
            <Footer/>
        </>
    );
}