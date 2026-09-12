import React, { useEffect, useState, useRef } from 'react';
import { CoffeeIcon } from './CoffeeLineArt';

export function ToastItem({ toast, onDismiss, onOpenCart }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const duration = toast.duration || 3500;
  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const remainingTimeRef = useRef(duration);

  const triggerClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 280);
  };

  useEffect(() => {
    if (isPaused) {
      clearTimeout(timerRef.current);
      remainingTimeRef.current -= Date.now() - startTimeRef.current;
      return;
    }

    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      triggerClose();
    }, Math.max(remainingTimeRef.current, 500));

    return () => clearTimeout(timerRef.current);
  }, [isPaused, toast.id]);

  const coffee = toast.item || {};
  const imageSrc = coffee.image || coffee.image_id;

  return (
    <div
      className={`cafe-toast-item ${isExiting ? 'cafe-toast-exit' : 'cafe-toast-enter'}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="status"
      aria-live="polite"
    >
      <div className="cafe-toast-body">
        {/* Coffee art/image icon */}
        <div className="cafe-toast-art-wrap">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={coffee.name || 'Coffee'}
              className="cafe-toast-thumb"
            />
          ) : (
            <div className="cafe-toast-icon-placeholder">
              <CoffeeIcon id={coffee.id || 'purr-fect-espresso-romano'} size={28} />
            </div>
          )}
          <span className="cafe-toast-check-badge" title="Added">✓</span>
        </div>

        {/* Text information */}
        <div className="cafe-toast-content">
          <div className="cafe-toast-tag">
            <span className="cafe-toast-steam">♨</span>
            <span>Added to Cart</span>
          </div>
          <h4 className="cafe-toast-title">{coffee.name || toast.message || 'Item added'}</h4>
          <div className="cafe-toast-meta">
            {coffee.price && <span className="cafe-toast-price">${coffee.price}</span>}
            {coffee.roast && <span className="cafe-toast-roast">• {coffee.roast}</span>}
          </div>
        </div>

        {/* Actions */}
        <div className="cafe-toast-actions">
          {onOpenCart && (
            <button
              type="button"
              className="cafe-toast-cart-btn"
              onClick={() => {
                triggerClose();
                onOpenCart();
              }}
            >
              View Cart →
            </button>
          )}
          <button
            type="button"
            className="cafe-toast-dismiss-btn"
            onClick={triggerClose}
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Progress countdown bar */}
      <div className="cafe-toast-progress-track">
        <div
          className="cafe-toast-progress-bar"
          style={{
            animationDuration: `${duration}ms`,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        />
      </div>
    </div>
  );
}

export default function ToastContainer({ toasts = [], onDismiss, onOpenCart }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="cafe-toast-container" aria-label="Notifications">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={onDismiss}
          onOpenCart={onOpenCart}
        />
      ))}
    </div>
  );
}
