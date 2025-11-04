import React, { useState } from 'react';
import './Header.css';
import searchIcon from '../assets/search.png';
import logo from '../assets/cpu.png';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  async function searchData() {
    if (search !== "") {
      try {
        const res = await fetch("http://localhost:3000/home/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ search }),
        });

        const data = await res.json();
        // Navigate to searched_products route and send data as state
        navigate("/searched_products", { state: { searchedProducts: data } });
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className='navbar'>
      <img src={logo} alt='logo icon' className='logo'/>
      <ul>
        <Link to={'/'}><li>Home</li></Link>
        <Link to={'/askai'}><li>Ask AI</li></Link>
        <Link to={'/builder'}><li>PC Builder</li></Link>
        <Link to={'/global_search'}><li>Global Search</li></Link>
      </ul>
      <div className='search-box'>
        <input 
          type='text' 
          placeholder='Search' 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <img 
          className='search_icon' 
          onClick={searchData} 
          src={searchIcon} 
          alt='search icon'
        />
      </div>
    </div>
  );
};

export default Header;
