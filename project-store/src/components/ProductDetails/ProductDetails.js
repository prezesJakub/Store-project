import React, {useState, useEffect, useContext} from 'react';
import { CartContext } from '../../context/CartContext';
import { useParams, useLocation } from 'react-router-dom';
import ReviewsList from '../ReviewsList/ReviewsList';
import AddReview from '../AddReview/AddReview';
import "./ProductDetails.css";

const ProductDetails = () => {
    const {id} = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const origin = queryParams.get('origin');
    const {addToCart} = useContext(CartContext);
    const [product, setProduct] = useState(null); 
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                let url;
                if (origin === 'fakestore') {
                    url = `https://fakestoreapi.com/products/${id}`;
                } else if (origin === 'local') {
                    url = `http://localhost:5000/products/${id}`;
                } else {
                    console.error("Invalid origin");
                    return;
                }
                
                const response = await fetch(url);

                if(!response.ok) {
                    throw new Error(`Failed with ${response.status}`);
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product details: ", error);
            }
        };

        fetchProduct();
    }, [id, origin]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviewsData = [
                    {
                        email: "john@example.com",
                        stars: 5,
                        message: "Great product!",
                        date: "2025-01-20",
                    },
                    {
                        email: "jane@example.com",
                        stars: 4,
                        message: "Good quality, but delivery took too long.",
                        date: "2025-01-18",
                    },
                ];
                setReviews(reviewsData);
            } catch (error) {
                console.error("Error fetching reviews: ", error);
            }
        };
        fetchReviews();
    }, [id])

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
            <div className="review-section">
                <ReviewsList reviews={reviews} />
            </div>
            <div className="add-review-section">
                <AddReview />
            </div>

            
        </div>
    );
};

export default ProductDetails;