import React, {useState, useEffect, useContext} from 'react';
import { CartContext } from '../../context/CartContext';
import { useParams } from 'react-router-dom';
import "./ProductDetails.css";

const ProductDetails = () => {
    const {id} = useParams();
    const {addToCart} = useContext(CartContext);
    const [product, setProduct] = useState(null); 

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data));
    }, [id]);

    if(!product) {
        return <div>Loading...</div>
    }

    return (
        <div className="product-details">
            <h2>{product.title}</h2>
            <div className="product-info">
                <div className="product-details-image">
                    <img src={product.image} alt={product.title}/>
                </div>
                <div className="product-description">
                    <p>{product.description}</p>
                    <p className="price">${product.price}</p>
                    <button className="add-to-cart" onClick={() => addToCart(product)}>
                        Dodaj do koszyka
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;