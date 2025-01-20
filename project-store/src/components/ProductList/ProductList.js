import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./ProductList.css";
import Searcher from "../Searcher/Searcher";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [sortOption, setSortOption] = useState("default");

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

    const handleMinPriceChange = (e) => {
        let value = parseFloat(e.target.value) || 0;
        if (value < 0) value = 0;
        setMinPrice(value);

        if(maxPrice !== 0 && value > maxPrice) {
            setMaxPrice(value);
        }
    };

    const handleMaxPriceChange = (e) => {
        let value = parseFloat(e.target.value) || 0;
        if (value < 0) value = 0;

        if(maxPrice === 0 && value !== 0 && value < minPrice) {
            setMaxPrice(minPrice);
        } else if (value !== 0 && value < minPrice) {
            setMaxPrice(0);
        } else {
            setMaxPrice(value);
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = 
            categoryFilter === "all" || product.category === categoryFilter;
        const matchesPrice =
            product.price >= minPrice && product.price <= (maxPrice || Infinity);

        return matchesSearch && matchesCategory && matchesPrice;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === "price-asc") {
            return a.price - b.price;
        } else if (sortOption === "price-desc") {
            return b.price - a.price;
        } else if (sortOption === "name-asc") {
            return a.title.localeCompare(b.title);  
        } else if (sortOption === "name-desc") {
            return b.title.localeCompare(a.title);
        }
        return 0;
    }); 

    return (
        <div className="product-list">
            <h2>Wszystkie produkty</h2>
            <div className="filters">
                <Searcher searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div>
                    <label>
                        Kategoria:
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="all">Wszystkie</option>
                            <option value="food">Jedzenie</option>
                            <option value="electronics">Elektronika</option>
                            <option value="jewelery">Biżuteria</option>
                            <option value="men's clothing">Odzież męska</option>
                            <option value="women's clothing">Odzież damska</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Cena minimalna:
                        <input 
                            type="number"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                        />
                    </label>
                    <label>
                        Cena maksymalna:
                        <input 
                            type="number"
                            value={maxPrice === 0 ? "" : maxPrice}
                            onChange={handleMaxPriceChange}
                            placeholder="Bez limitu"
                        />
                    </label>
                </div>
                <div>
                    <label>Sortuj:</label>
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                        <option value="default">Domyślnie</option>
                        <option value="price-asc">Cena rosnąco</option>
                        <option value="price-desc">Cena malejąco</option>
                        <option value="name-asc">Nazwa (A-Z)</option>
                        <option value="name-desc">Nazwa (Z-A)</option>
                    </select>
                </div>
            </div>
            
            <div className="product-grid">
                {sortedProducts.map(product => (
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