import React, { useState, useEffect } from 'react';
import scrollTo from 'gatsby-plugin-smoothscroll';

export default function BackToTop() {
  const style = {
    padding: '1rem',
    background: 'rgba(255,255,255,0.8)',
    position: 'fixed',
    border: 'none',
    fontWeight: '800',
    bottom: '0',
    right: '0',
    cursor: 'pointer',
    transition: 'all 1s linear',
  };
  const [isVisible, setIsVisible] = useState(false);

  function handleScroll() {
    if (window.pageYOffset > window.screenY + 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    isVisible && (
      <button style={style} onClick={() => scrollTo('#top')}>
        Top
      </button>
    )
  );
}
