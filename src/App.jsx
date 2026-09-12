import React, { useState, useEffect } from 'react';
import LandingView from './components/LandingView';
import MenuBookView from './components/MenuBookView';
import CoffeeModal from './components/CoffeeModal';
import CartPage from './components/CartPage';
import ToastContainer from './components/ToastNotification';
import { useCart } from './CartContext';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const { totalItems, toasts, hideToast } = useCart();

  useEffect(() => {
    if (totalItems > 0) {
      setCartBump(true);
      const timer = setTimeout(() => setCartBump(false), 400);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  const handleEnterMenu = () => {
    setCurrentView('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setSelectedCoffee(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCoffee = (coffee) => {
    setSelectedCoffee(coffee);
  };

  const handleCloseModal = () => {
    setSelectedCoffee(null);
  };

  return (
    <div className="cafe-app-container">
      <button
        onClick={() => setShowCart(true)}
        aria-label="Open cart"
        className={`floating-cart-btn ${cartBump ? 'cart-bump-animation' : ''}`}
      >
        🛒
        {totalItems > 0 && (
          <span className="floating-cart-badge">
            {totalItems}
          </span>
        )}
      </button>

      <main className="cafe-main-content">
        {currentView === 'landing' && (
          <LandingView onEnterMenu={handleEnterMenu} />
        )}

        {currentView === 'menu' && (
          <MenuBookView
            onBackToLanding={handleBackToLanding}
            onSelectCoffee={handleSelectCoffee}
          />
        )}
      </main>

      {selectedCoffee && (
        <CoffeeModal
          coffee={selectedCoffee}
          onClose={handleCloseModal}
        />
      )}

      {showCart && (
        <CartPage onClose={() => setShowCart(false)} />
      )}

      <ToastContainer
        toasts={toasts}
        onDismiss={hideToast}
        onOpenCart={() => setShowCart(true)}
      />
    </div>
  );
}