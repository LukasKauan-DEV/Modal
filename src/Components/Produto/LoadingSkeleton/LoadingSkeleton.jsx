// src/components/LoadingSkeleton/LoadingSkeleton.js
import React from 'react';

const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <div className="container py-5">
      <div className="row g-4">
        {[...Array(count)].map((_, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-img-top bg-light" style={{ height: '200px' }}></div>
              <div className="card-body">
                <div className="placeholder-glow">
                  <h5 className="card-title placeholder col-8"></h5>
                  <p className="card-text placeholder col-12"></p>
                  <p className="card-text placeholder col-6"></p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;