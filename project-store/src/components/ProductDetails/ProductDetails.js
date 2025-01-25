import React, {useState, useEffect, useContext} from 'react';
import { CartContext } from '../../context/CartContext';
import { useParams } from 'react-router-dom';
import ReviewsList from '../ReviewsList/ReviewsList';
import AddReview from '../AddReview/AddReview';
import "./ProductDetails.css";

const ProductDetails = () => {
    const {id} = useParams();
    const {addToCart} = useContext(CartContext);
    const [product, setProduct] = useState(null); 
    const [reviews, setReviews] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token) {
            setIsLoggedIn(true);
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUserRole(decodedToken.role);
            setUserEmail(decodedToken.email);
        } else {
            setIsLoggedIn(false);
        }

        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/products/${id}`);
                if (!response.ok) {
                    throw new Error(`Błąd pobierania produktu o ID ${id}`);
                }
                const productData = await response.json();
                setProduct(productData);
            } catch (error) {
                console.error("Błąd pobierania szczegółów produktu: ", error);
            }
        };

        fetchProduct();
    }, [id]);

    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/reviews/${id}`);
            if(!response.ok) {
                throw new Error(`Błąd pobierania recenzji dla produktu o ID ${id}`);
            }
            const reviewsData = await response.json();
            setReviews(reviewsData);
        } catch (error) {
            console.error("Błąd pobierania recenzji: ", error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [id])

    const handleReviewDeleted = (deletedReviewId) => {
        setReviews((prevReviews) => prevReviews.filter((review) => review.id !== deletedReviewId));
    }

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
                    <button 
                        className="add-to-cart" 
                        onClick={() => addToCart(product)}
                        disabled={!isLoggedIn}
                    >
                        Dodaj do koszyka
                    </button>
                </div>
            </div>
            <div className="review-section">
                <ReviewsList 
                    reviews={reviews} 
                    userRole={userRole}
                    userEmail={userEmail}
                    onReviewDeleted={handleReviewDeleted}
                />
            </div>
            <div className="add-review-section">
                <AddReview 
                    productId={id}
                    isLoggedIn={isLoggedIn}
                    onReviewAdded={() => fetchReviews()}
                />
            </div>

            
        </div>
    );
};

export default ProductDetails;