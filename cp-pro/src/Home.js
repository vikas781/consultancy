import React, { useState } from 'react';
import './Home.css';

const products = [
  { id: 1, name: 'Soap', price: 50, image: '/images/soap.jpg' },
  { id: 2, name: 'Detergent', price: 150, image: '/images/detergent.jpg' },
  { id: 3, name: 'Perfume', price: 500, image: '/images/perfume.jpg' },
  { id: 4, name: 'Shampoo', price: 250, image: '/images/shampoo.jpg' },
  { id: 5, name: 'Toothpaste', price: 100, image: '/images/toothpaste.jpg' },
  { id: 6 , name: '',price: 0,image:''},
  { id: 7 , name: '',price: 0,image:''},
  { id: 8 , name: '',price: 0,image:''},
  { id: 9 , name: '',price: 0,image:''}
];

function Home() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCart(cart.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = () => {
    window.location.href = '/order-summary';
  };

  return (
    <div className="App" style={{
      backgroundImage: "url('/images/chemical.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      <nav>
        <h1 style={{ fontSize: '20px' }}>Website</h1>
        <div className="cart-icon" onClick={() => setIsCartOpen(!isCartOpen)}>
          🛒 Cart ({cart.length})
        </div>
      </nav>

      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className={`cart-slide ${isCartOpen ? 'open' : ''}`}>
        <h2>🛒 Your Cart</h2>
        {cart.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          <div>
            {cart.map((item, index) => (
  <div key={index} className="cart-item">
    <img src={item.image} alt={item.name} className="cart-item-image" />
    <div className="cart-item-details">
      <p>{item.name}</p>
      <p>₹{item.price} x {item.quantity}</p>
    </div>
    <div className="cart-item-actions">
      <button onClick={() => increaseQuantity(item.id)}>+</button>
      <button onClick={() => decreaseQuantity(item.id)}>-</button>
      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
  </div>
))}

            <h3>Total: ₹{getTotal()}</h3>
            <button onClick={placeOrder}>Place Order</button>
          </div>
        )}
        <button className="close-btn" onClick={() => setIsCartOpen(false)}>Close</button>
      </div>
    </div>
  );
}

export default Home;
