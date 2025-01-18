import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./ProductList.css";
import Searcher from "../Searcher/Searcher";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="product-list">
            <h2>Wszystkie produkty</h2>
            <Searcher searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="product-grid">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <Link to={`/product/${product.id}`}>
                            <img src={product.image} alt={product.title} className="product-image"/>
                            <h3>{product.title}</h3>
                            <p>{product.description.substring(0, 100)}...</p>
                            <p className="price">${product.price}</p>
                        </Link>               
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;