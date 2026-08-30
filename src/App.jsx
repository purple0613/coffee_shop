import React, { useState } from 'react';
import LandingView from './components/LandingView';
import MenuBookView from './components/MenuBookView';
import CoffeeModal from './components/CoffeeModal';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'menu'
  const [selectedCoffee, setSelectedCoffee] = useState(null);

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

      {/* Coffee Details / Prep Instructions Recipe Card Modal */}
      {selectedCoffee && (
        <CoffeeModal 
          coffee={selectedCoffee} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}
