import React, { useState } from 'react';
import LandingView from './components/LandingView';
import MenuBookView from './components/MenuBookView';
import CoffeeModal from './components/CoffeeModal';
import CartPage from './components/CartPage';
import { useCart } from './CartContext';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const { totalItems } = useCart();

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
        style={{
          position: 'fixed',
          top: '1.25rem',
          right: '1.25rem',
          zIndex: 50,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'var(--ink-deep, #2A170D)',
          color: '#FAF2E6',
          border: '2px solid rgba(217, 168, 92, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.4)'
        }}
      >
        🛒
        {totalItems > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#D9A85C',
              color: '#2A170D',
              borderRadius: '50%',
              width: '22px',
              height: '22px',
              fontSize: '0.75rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #2A170D'
            }}
          >
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
    </div>
  );
}