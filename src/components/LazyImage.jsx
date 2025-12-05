import React, { useState, useRef, useEffect } from 'react';

const LazyImage = ({ src, alt, className, placeholder = null }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    // Si IntersectionObserver n'est pas disponible (tests), charger immédiatement
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className={className}>
      {!isInView && (
        <div 
          className="lazy-placeholder"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '150px'
          }}
        >
          {placeholder || <div className="loading-spinner">⚪</div>}
        </div>
      )}
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'loaded' : 'loading'}`}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            width: '100%',
            height: 'auto',
            display: hasError ? 'none' : 'block'
          }}
        />
      )}
      
      {hasError && (
        <div 
          className="error-placeholder"
          style={{
            width: '100%',
            height: '150px',
            backgroundColor: '#f8d7da',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#721c24',
            fontSize: '0.9rem'
          }}
        >
          Image non disponible
        </div>
      )}
    </div>
  );
};

export default LazyImage;