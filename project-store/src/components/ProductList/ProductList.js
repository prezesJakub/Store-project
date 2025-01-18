import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./ProductList.css";
import Searcher from "../Searcher/Searcher";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fakestorePromise = fetch('https://fakestoreapi.com/products')
                    .then((response) => {
                        if(!response.ok) {
                            console.error("Błąd pobierania danych z FakestoreAPI");
                            return [];
                        }
                        return response.json();
                    })
                    .catch((error) => {
                        console.error("Błąd danych w fetch FakestoreAPI", error);
                        return [];
                    });
                
                const localPromise = fetch('http://localhost:5000/products')
                    .then((response) => {
                        if(!response.ok) {
                            console.error("Błąd pobierania danych z db.json");
                            return [];
                        }
                        return response.json();
                    })
                    .catch((error) => {
                        console.error("Błąd danych w fetch FakestoreAPI", error);
                        return [];
                    });
                
                const [fakestoreData, localData] = await Promise.all([fakestorePromise, localPromise]);

                console.log("Dane z FakestoreAPI:", fakestoreData);
                console.log("Dane z db.json:", localData);

                setProducts([
                    ...fakestoreData.map((product) => ({ ...product, origin: 'fakestore' })),
                    ...localData.map((product) => ({ ...product, origin: 'local' })),
                ]);
            } catch (error) {
                console.error("Błąd", error);
            };
        
        };
        fetchProducts();
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
                        <Link to={`/product/${product.id}?origin=${product.origin}`}>
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