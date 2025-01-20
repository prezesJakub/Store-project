import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import ProductList from './components/ProductList/ProductList';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import OrderPage from './components/OrderPage/OrderPage';
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation';
import CartProvider from './context/CartContext';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import RegistrationConfirmation from './components/RegistrationConfirmation/RegistrationConfirmation';


const App = () => {
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registration-confirmation" element={<RegistrationConfirmation />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
};

export default App;
