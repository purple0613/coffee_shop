import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { CoffeeIcon } from './CoffeeLineArt';

const ITEMS_PER_PAGE = 2;

export function PenDivider() {
  return (
    <div className="pen-stroke-divider" aria-hidden="true">
      <svg viewBox="0 0 400 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 4c40-1.5 80 1 120-.5s80-1.5 120 1 80-1 120-.5 36 1 36 1"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.65"
        />
      </svg>
    </div>
  );
}

function slugify(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
}

export default function MenuBookView({ onBackToLanding, onSelectCoffee }) {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchCoffees() {
      const { data, error } = await supabase.from('coffees').select('*');
      if (error) {
        setError(error.message);
      } else {
        const withIds = data.map((c) => ({ ...c, id: slugify(c.name) }));
        setCoffees(withIds);
      }
      setLoading(false);
    }
    fetchCoffees();
  }, []);

  const totalPages = Math.ceil(coffees.length / ITEMS_PER_PAGE);
  const startIndex = page * ITEMS_PER_PAGE;
  const visibleCoffees = coffees.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goNext = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const goPrev = () => setPage((p) => Math.max(p - 1, 0));

  return (
    <div className="notebook-spread-wrapper">
      <div className="notebook-top-bar">
        <button
          id="back-to-landing-btn"
          className="btn-notebook-back"
          onClick={onBackToLanding}
          aria-label="Close Notebook"
        >
          <span>←</span>
          <span>Close Notebook</span>
        </button>
      </div>

      <div className="notebook-paper-open">
        <div className="notebook-spread-grid">
          <div className="notebook-page notebook-page-left">
            <div className="page-journal-header">
              <div className="page-category-tag">Field Journal • Vol. IV</div>
              <h2 className="page-journal-title">Paws & Coffee</h2>
              <p className="page-journal-subtitle">Roaster's Notes & Daily Observations</p>
            </div>

            <div className="journal-intro-entry">
              <p className="journal-quote">
                &ldquo;A warm ceramic mug and fresh steam in the air.&rdquo;
              </p>
              <p className="journal-body-text">
                Every beverage on the opposite page is prepared by hand to highlight natural caramelized sweetness and floral honey notes.
              </p>
            </div>

            <div className="page-bottom-number">— Page 4 • Field Journal —</div>
          </div>

          <div className="notebook-page notebook-page-right">
            <div className="page-journal-header">
              <div className="page-category-tag">Craft Beverages</div>
              <h2 className="page-journal-title">Daily Brews</h2>
              <p className="page-journal-subtitle">Hand-drawn selections & recipes</p>
            </div>

            {loading && <p>Loading menu...</p>}
            {error && <p>Couldn't load menu: {error}</p>}

            <div className="notebook-coffee-stream">
              {visibleCoffees.map((coffee, index) => (
                <React.Fragment key={coffee.id}>
                  <div
                    className="notebook-coffee-entry"
                    onClick={() => onSelectCoffee(coffee)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectCoffee(coffee);
                      }
                    }}
                  >
                    <div className="entry-art-column">
                      <CoffeeIcon id={coffee.id} size={44} />
                    </div>

                    <div className="entry-text-column">
                      <div className="entry-head-row">
                        <span className="entry-title">{coffee.name}</span>
                        <div className="entry-dotted-leader" aria-hidden="true"></div>
                        <span className="entry-price-tag">${coffee.price}</span>
                      </div>

                      <p className="entry-description-line">{coffee.prep_instructions}</p>

                      <div className="entry-notes-row">
                        <div className="entry-tasting-notes">
                          Notes: {coffee.tasting_notes?.join(' · ')}
                        </div>
                        <div className="entry-click-prompt">
                          <span>Recipe</span>
                          <span>→</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {index < visibleCoffees.length - 1 && <PenDivider />}
                </React.Fragment>
              ))}
            </div>

            {/* Page turn controls with dot indicators instead of "Page X of Y" text */}
            {totalPages > 1 && (
              <div className="notebook-page-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                <button
                  className="btn-notebook-back"
                  onClick={goPrev}
                  disabled={page === 0}
                >
                  ← Previous
                </button>

                <div style={{ display: 'flex', gap: '0.5rem' }} aria-label={`Page ${page + 1} of ${totalPages}`}>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <span
                      key={i}
                      onClick={() => setPage(i)}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'inline-block',
                        backgroundColor: i === page ? 'var(--ink-gold, #B8946A)' : 'rgba(139, 90, 43, 0.3)',
                        transition: 'background-color 0.2s ease'
                      }}
                    />
                  ))}
                </div>

                <button
                  className="btn-notebook-back"
                  onClick={goNext}
                  disabled={page === totalPages - 1}
                >
                  Next →
                </button>
              </div>
            )}

            <div className="page-bottom-number">— Page {5 + page} • Specialty Recipes —</div>
          </div>
        </div>
      </div>
    </div>
  );
}