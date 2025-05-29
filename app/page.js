'use client'
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

function Product({ product, filters}) {
  if (filters.brand!="Any" && filters.brand!=product.brand){
    return null
  }
  if (filters.rating!=0 && filters.rating!=product.rating){
    return null
  }
  if (filters.price!="Any" && filters.price!=product.price){
    return null
  }
  if (filters.condition!="Any" && filters.condition!=product.condition){
    return null
  }
  if (filters.category!="Any" && filters.category!=product.category){
    return null
  }
  if (filters.sellerLoc!="Any" && filters.sellerLoc!=product.sellerLoc){
    console.log("product loc: ", product.sellerLoc)
    console.log("filters loc: ", filters.sellerLoc)
    return null
  }
  return <div className="product" id={product.prodId}>
    <div className="product-image-wrapper">
      <Image src={product.img_path} width={200} height={200} alt="Product Image" />
    </div>
    <span>{product.prodName}</span>
</div>
}
export default function Home() {
  const [inputVal, setInputVal] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [filters, setFilters] = useState({
    brand: "Any",
    rating: 0,
    price: "Any",
    condition: "Any",
    category: "Any",
    sellerLoc: "Any"
  })

  const products = [
    { prodName: "Phone Case", prodId: "1", img_path: "phonecase.png", brand: "Samsung", rating:5, price: 10, condition:"New", category:"Protection", sellerLoc:"Winnipeg"},
    { prodName: "Power Bank", prodId: "2", img_path: "powerbank.jpg", brand: "Tesla", rating:1, price: 120, condition:"Old", category:"Power", sellerLoc:"Winnipeg"},
    { prodName: "Charger", prodId: "3", img_path: "charger.png", brand: "Samsung", rating:5, price: 40, condition:"Old", category:"Charger", sellerLoc:"Reston"},
    { prodName: "Selfie Sticks", prodId: "4", img_path: "selfiestick.png", brand: "Apple", rating:4, price: 10, condition:"New", category:"Other",sellerLoc:"Virden" },
    { prodName: "Bluetooth Speaker", prodId: "5", img_path: "bspeaker.png", brand: "Nokia", rating:3, price: 10, condition:"New", category:"Other",sellerLoc:"Winnipeg"},
    { prodName: "Screen Protector", prodId: "6", img_path: "screenprotector.png", brand: "Xiaomi", rating:5, price: 10, condition:"Old", category:"Protection", sellerLoc:"Winnipeg"},
  ]

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      brand: "Any",
      rating: 0,
      price: "Any",
      condition: "Any",
      category: "Any",
      sellerLoc: "Any"
    })
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
  <>
    {isSidebarOpen && <div id="sidebar-overlay" className="sidebar-overlay" onClick={toggleSidebar}></div>}
    <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} id="sidebar">
      <div className="sidebar-section">
        <label htmlFor="brand-select">Brand</label>
        <select 
          id="brand-select" 
          className="sidebar-select"
          value={filters.brand}
          onChange={(e) => handleFilterChange('brand', e.target.value)}
        >
          <option value="Any">Any</option>
          <option value="Samsung">Samsung</option>
          <option value="Xiaomi">Xiaomi</option>
          <option value="Tesla">Tesla</option>
          <option value="Nokia">Nokia</option>
          <option value="Apple">Apple</option>
        </select>
      </div>
      <div className="sidebar-section">
        <label htmlFor="rating-select">Rating</label>
        <select 
          id="rating-select" 
          className="sidebar-select"
          value={filters.rating}
          onChange={(e) => handleFilterChange('rating', e.target.value)}
        >
          <option value="Any">Any</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars & up</option>
          <option value="3">3 Stars & up</option>
        </select>
      </div>
      <div className="sidebar-section">
        <label htmlFor="price-select">Price</label>
        <select 
          id="price-select" 
          className="sidebar-select"
          value={filters.price}
          onChange={(e) => handleFilterChange('price', e.target.value)}
        >
          <option value="Any">Any</option>
          <option value="1">$0 - $10</option>
          <option value="2">$10 - $50</option>
          <option value="3">$50 - $100</option>
          <option value="4">$100+</option>
        </select>
      </div>
      <div className="sidebar-section">
        <label htmlFor="condition-select">Condition</label>
        <select 
          id="condition-select" 
          className="sidebar-select"
          value={filters.condition}
          onChange={(e) => handleFilterChange('condition', e.target.value)}
        >
          <option value="Any">Any</option>
          <option value="Old">Old</option>
          <option value="New">New</option>
        </select>
      </div>
      <div className="sidebar-section">
        <label htmlFor="category-select">Category</label>
        <select 
          id="category-select" 
          className="sidebar-select"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="Any">Any</option>
          <option value="Protection">Protection</option>
          <option value="Power">Power</option>
          <option value="Charger">Charger</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="sidebar-section">
        <label htmlFor="seller-loc">Seller Location</label>
        <select 
          id="seller-loc" 
          className="sidebar-select"
          value={filters.sellerLoc}
          onChange={(e) => handleFilterChange('sellerLoc', e.target.value)}
        >
          <option value="Any">Any</option>
          <option value="Winnipeg">Winnipeg</option>
          <option value="Virden">Virden</option>
          <option value="Reston">Reston</option>
        </select>
      </div>
      <button className="clear-filter-btn" onClick={clearFilters}>Clear Filter</button>
    </aside>
    <div className="controls">
        <a href="#cart">Carts</a>
        <a href="#orders">Orders</a>
    </div>
    <header className="sub-main">
      <div className="user-profile">
          <div className="user-img-wrapper">
            <FontAwesomeIcon icon={faUser} size="5x" className="userImage" />
          </div>
          User A
      </div>
      <div className="search-bar">
        <input type="text" placeholder="" onInput={(e)=>{setInputVal(e.target.value)}}/>
      </div>
      <div className="bar-wrapper">
        <FontAwesomeIcon icon={faBars} size="3x" className="filterIcon" onClick={toggleSidebar}/>
      </div>
    </header>

    <main className="product-list">
      {products.map((product) => (
        product.prodName.toLocaleLowerCase().startsWith(inputVal.toLocaleLowerCase())?
        <Product 
          key={product.prodId} 
          product={product}
          filters={filters}
        />:null
      ))}
    </main>
  </>
  );
}
