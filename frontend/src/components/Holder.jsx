import React from 'react';
import './Holder.css';
import { useBuilder } from "../BuilderContext";
import { Link } from 'react-router-dom';

export default function Holder({ products }) {
  const { builder, addToBuilder, removeFromBuilder } = useBuilder();
  
  return (
    <div className="holder-grid">
      {products.map((product, index) => (
        <div className="product-card" key={index}>
          <div className="image-container">
            <img
              src={`http://localhost:3000/images/by-id/${product.productid}`}
              alt={product.name}
            />
          </div>
          
          <h3 className="product-title">{product.name}</h3>
          {product.price && <p className="product-price">Price:<span>৳{product.price}</span></p>}
          <Link to={'/builder'}>
            <button 
              className='add-to-builder-btn' 
              onClick={() => {
                let id = product.productid;
                let result = id.replace(/[0-9]/g, "").toLowerCase();
                if(result === 'mb'){
                  result = 'mobo'
                }
                removeFromBuilder(`${result}`);
                addToBuilder(`${result}`, product);
              }}
            >
              Add to Builder
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}