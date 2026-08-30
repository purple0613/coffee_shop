import React, { useState, useEffect } from 'react';
import { CoffeeIcon } from './CoffeeLineArt';
import { useCart } from '../CartContext';

export default function CoffeeModal({ coffee, onClose }) {
  const { addToCart } = useCart();
  const [completedSteps, setCompletedSteps] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!coffee) return null;

  const toggleStep = (stepNumber) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  return (
    <div
      className="notebook-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-coffee-title"
    >
      <div className="notebook-recipe-sheet">
        <button
          id="modal-close-button"
          className="notebook-close-btn"
          onClick={onClose}
          aria-label="Close recipe page"
        >
          ✕
        </button>

        <div className="recipe-header-grid">
          <div className="recipe-illustration-frame">
            {coffee.image_id ? (
              <img
                src={coffee.image_id}
                alt={coffee.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
            ) : (
              <CoffeeIcon id={coffee.id} size={60} />
            )}
          </div>

          <div>
            <h2 id="modal-coffee-title" className="recipe-title-h2">
              {coffee.name}
            </h2>
            <div className="recipe-specs-line">
              <span><strong>Roast:</strong> {coffee.roast}</span>
              <span>•</span>
              <span><strong>Origin:</strong> {coffee.origin}</span>
              <span>•</span>
              <span><strong>Size:</strong> {coffee.size}</span>
              <span>•</span>
              <span><strong>Price:</strong> ${coffee.price}</span>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.94rem', color: 'var(--ink-warm)', lineHeight: '1.65', marginBottom: '1.6rem' }}>
          {coffee.prep_instructions}
        </p>

        <div className="recipe-journal-columns">
          <div>
            <h3 className="journal-section-heading">
              <span>✦</span> Ingredients & Proportions
            </h3>
            <ul className="recipe-ingredients-list">
              {coffee.ingredients?.map((item, idx) => (
                <li key={idx} className="recipe-ingredient-row">
                  <span>{item.item}</span>
                  <span className="ing-amount-text">{item.amount}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="journal-section-heading">
              <span>✦</span> Tasting Profile
            </h3>
            <div className="recipe-tasting-list">
              {coffee.tasting_notes?.map((note, idx) => (
                <div key={idx}>~ {note}</div>
              ))}
            </div>
          </div>
        </div>

        <button
          className="btn-add-to-cart"
          onClick={() => addToCart(coffee)}
          style={{
            width: '100%',
            padding: '0.9rem',
            background: 'var(--ink-deep)',
            color: '#FAF2E6',
            fontFamily: 'var(--font-serif-heading)',
            fontSize: '1.1rem',
            fontWeight: '700',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.6rem',
            cursor: 'pointer',
            border: 'none'
          }}
        >
          Add to Cart — ${coffee.price}
        </button>

        <div>
          <h3 className="journal-section-heading">
            <span>✨</span> Brewing Steps
          </h3>

          <div className="recipe-steps-stream">
            {coffee.brewing_steps?.map((stepItem) => {
              const isDone = !!completedSteps[stepItem.step];
              return (
                <div
                  key={stepItem.step}
                  className={`recipe-step-entry ${isDone ? 'step-completed' : ''}`}
                  onClick={() => toggleStep(stepItem.step)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleStep(stepItem.step);
                    }
                  }}
                >
                  <div className="step-marker">
                    {isDone ? '✓' : `[ ${stepItem.step} ]`}
                  </div>
                  <div className="step-text-wrap">
                    <div className="step-heading-line">
                      <span className="step-title-text">{stepItem.title}</span>
                      <span className="step-time-annotation">⏱ {stepItem.time}</span>
                    </div>
                    <p className="step-instructions-text">{stepItem.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {coffee.barista_note && (
          <div className="barista-marginal-note">
            * <em>Barista Journal Note:</em> &ldquo;{coffee.barista_note}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}