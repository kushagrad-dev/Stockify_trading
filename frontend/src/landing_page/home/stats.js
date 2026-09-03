import React from 'react';

function Stats() {
  return (
    <div className="container py-5">
      <div className="row align-items-center pt-5 mt-5">
        <div className="col-lg-6 col-md-12 pt-3 mb-5 mb-lg-0">
          <h1 className="mb-5 fs2">Trust with confidence</h1>

          <h2 className="mb-2 mt-5 fs-4">Customer-first always</h2>
          <p className="text-muted">
            That's why 1.3+ crore customers trust Stockify with ₹3.5+ lakh crore of their
            investments.
          </p>

          <h2 className="mb-2 fs-4">No spam or gimmicks</h2>
          <p className="text-muted">
            No gimmicks, spam, "gamification", or annoying push notifications. Just a
            simple, intuitive, and powerful platform to invest in everything.
          </p>

          <h2 className="mb-2 fs-4">The Stockify Universe</h2>
          <p className="text-muted">
            Not just an app but a complete ecosystem of products and services to help you
            invest, learn, and grow your wealth.
          </p>

          <h2 className="mb-2 fs-4">Do better with money</h2>
          <p className="text-muted">With initiatives like Nudge and Kill Switch.</p>
        </div>

        <div className="col-lg-6 col-md-12 text-center pt-3">
          <img src="media/ecosystem.png" alt="Ecosystem" className="img-fluid mb-4" style={{ maxWidth: '85%', height: 'auto' }} />
          <div className="mt-3">
            <a href="/products" className="me-4" style={{ fontWeight: 'bold', textDecoration: 'none' }}>
               Explore our products &rarr;
            </a>
            <a href="/kite" className="ms-2" style={{ fontWeight: 'bold' ,textDecoration: 'none' }}>
              Try Kite demos &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
