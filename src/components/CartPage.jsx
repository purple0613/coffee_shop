import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { supabase } from '../supabaseClient';

export default function CartPage({ onClose }) {
    const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        if (!name.trim() || !contact.trim()) {
            setError('Please fill in both your name and contact info.');
            return;
        }

        setSubmitting(true);
        setError(null);

        const orderItems = items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }));

        const { error: insertError } = await supabase.from('orders').insert({
            customer_name: name,
            contact: contact,
            items: orderItems,
            total_price: totalPrice
        });

        setSubmitting(false);

        if (insertError) {
            setError('Something went wrong placing your order: ' + insertError.message);
            return;
        }

        setOrderPlaced(true);
        clearCart();
    };

    if (orderPlaced) {
        return (
            <div className="notebook-modal-backdrop" role="dialog" aria-modal="true">
                <div className="notebook-recipe-sheet" style={{ textAlign: 'center' }}>
                    <h2 className="recipe-title-h2" style={{ marginBottom: '1rem' }}>
                        Order Placed!
                    </h2>
                    <p style={{ color: 'var(--ink-body)', marginBottom: '1.5rem' }}>
                        Thanks, {name}! Your order has been received.
                    </p>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.9rem 2rem',
                            background: 'var(--ink-deep)',
                            color: '#FAF2E6',
                            fontFamily: 'var(--font-serif-heading)',
                            fontSize: '1.05rem',
                            fontWeight: '700',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            border: 'none'
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="notebook-modal-backdrop"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
            role="dialog"
            aria-modal="true"
        >
            <div className="notebook-recipe-sheet">
                <button
                    className="notebook-close-btn"
                    onClick={onClose}
                    aria-label="Close cart"
                >
                    ✕
                </button>

                <h2 className="recipe-title-h2" style={{ marginBottom: '1.5rem' }}>
                    {showCheckoutForm ? 'Checkout' : 'Your Cart'}
                </h2>

                {items.length === 0 ? (
                    <p style={{ color: 'var(--ink-body)' }}>
                        Your cart is empty. Go add some coffee!
                    </p>
                ) : !showCheckoutForm ? (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingBottom: '0.75rem',
                                        borderBottom: '1px dotted var(--line-divider)'
                                    }}
                                >
                                    <div>
                                        <div style={{ fontFamily: 'var(--font-serif-heading)', fontSize: '1.1rem', color: 'var(--ink-deep)' }}>
                                            {item.name}
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
                                            ${item.price} each
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            style={{
                                                width: '28px',
                                                height: '28px',
                                                borderRadius: '50%',
                                                border: '1px solid var(--ink-muted)',
                                                background: 'transparent',
                                                cursor: 'pointer',
                                                fontSize: '1rem'
                                            }}
                                        >
                                            −
                                        </button>
                                        <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            style={{
                                                width: '28px',
                                                height: '28px',
                                                borderRadius: '50%',
                                                border: '1px solid var(--ink-muted)',
                                                background: 'transparent',
                                                cursor: 'pointer',
                                                fontSize: '1rem'
                                            }}
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            style={{
                                                marginLeft: '0.5rem',
                                                background: 'transparent',
                                                border: 'none',
                                                color: 'var(--ink-amber-dark)',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                                textDecoration: 'underline'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '1.2rem',
                                fontWeight: '700',
                                color: 'var(--ink-deep)',
                                marginBottom: '1.5rem'
                            }}
                        >
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={() => setShowCheckoutForm(true)}
                            style={{
                                width: '100%',
                                padding: '0.9rem',
                                background: 'var(--ink-deep)',
                                color: '#FAF2E6',
                                fontFamily: 'var(--font-serif-heading)',
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                border: 'none'
                            }}
                        >
                            Checkout
                        </button>
                    </>
                ) : (
                    <form onSubmit={handleSubmitOrder}>
                        <div style={{ marginBottom: '1.2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--ink-deep)', fontWeight: '700' }}>
                                Your Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.7rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--ink-muted)',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit'
                                }}
                                placeholder="Jane Doe"
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--ink-deep)', fontWeight: '700' }}>
                                Email or Phone
                            </label>
                            <input
                                type="text"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.7rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--ink-muted)',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit'
                                }}
                                placeholder="jane@example.com"
                            />
                        </div>

                        {error && (
                            <p style={{ color: '#8B2D2D', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                {error}
                            </p>
                        )}

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                color: 'var(--ink-deep)',
                                marginBottom: '1.2rem'
                            }}
                        >
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                                type="button"
                                onClick={() => setShowCheckoutForm(false)}
                                style={{
                                    flex: 1,
                                    padding: '0.9rem',
                                    background: 'transparent',
                                    color: 'var(--ink-deep)',
                                    border: '1px solid var(--ink-muted)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '1rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                style={{
                                    flex: 2,
                                    padding: '0.9rem',
                                    background: 'var(--ink-deep)',
                                    color: '#FAF2E6',
                                    fontFamily: 'var(--font-serif-heading)',
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    borderRadius: 'var(--radius-md)',
                                    cursor: submitting ? 'not-allowed' : 'pointer',
                                    border: 'none',
                                    opacity: submitting ? 0.7 : 1
                                }}
                            >
                                {submitting ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}