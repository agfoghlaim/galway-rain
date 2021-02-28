import React, { useState, useRef, useEffect } from 'react';

import { Link } from 'gatsby';
import classes from './header.module.scss';
import { Burger, Nav } from '../';
import { useClickToCloseNav } from '../../hooks/useClickToCloseNav';

function Header({ siteTitle, siteDescription }, props) {
  const [navOpen, setNavOpen] = useState(false);
  const anywhereOnThePage = useRef(null);
  const [isMobile, setIsMobile] = useState(null);

  const firstItem = useRef(null);
  const lastItem = useRef(null);
  const menuBtnRef = useRef(null);
  const navRef = useRef(null);
  useClickToCloseNav(anywhereOnThePage, () => setNavOpen(false));

  useEffect(() => {
    function isScreenMobile() {

      // Note: max-width corresponds to media query in nav.module.scss, this should be a const.
      let mql = window.matchMedia('(max-width: 560px)');
      mql.matches ? setIsMobile(true) : setIsMobile(false);
    }
    // Find if screen is small or not on initial load.
    isScreenMobile();

    // Set listener to listen for window resize.
    let mql = window.matchMedia('(max-width: 560px)');
    mql.addEventListener('change', isScreenMobile);

    // Cleanup listener.
    return function cleanUp() {
      mql.removeEventListener('change', isScreenMobile);
    };
  }, []);

  useEffect(() => {
    if (!navOpen || !isMobile) return;

    function handleNavKeyboard(e) {
      
      // Close menu if open & escape is pressed
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setNavOpen(false);
      }

      // If tab away from last menu item, trap focus inside nav/button by setting focus back to the menu button. Maybe focus should go back to first menu item?
      if (e.key === 'Tab' && document.activeElement === lastItem.current) {
        e.preventDefault();
        e.stopPropagation();
        menuBtnRef.current.focus();
        return;
      }
    }
    const nav = navRef.current;
    nav.addEventListener('keydown', handleNavKeyboard);

    // Remove listener.
    return function cleanUp() {
      nav.removeEventListener('keydown', handleNavKeyboard);
    };
  }, [navOpen, isMobile]);

  function handleKeydown(e) {
    // Open menu if Space or Enter are pressed.
    if ([' ', 'Enter'].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      setNavOpen(!navOpen);
    }

    // Close menu if Escape pressed (& focus is inside <nav>, handleNavKeyboard above handles Escape if Menu burger btn has focus.)
    if (e.key === 'Escape' && navOpen) {
      e.preventDefault();
      e.stopPropagation();
      setNavOpen(false);
    }
  }

  function handleClick(e) {
    if (navOpen) {
      setNavOpen(false);
    } else {
      setNavOpen(true);
      // firstItem.current.focus();
    }
  }

  return (
    <header ref={anywhereOnThePage} className={classes.header} id="top">
      <Link className={classes.logo} to="/">
        {siteTitle}
      </Link>

      <div>
        <Burger
          menuBtnRef={menuBtnRef}
          navOpen={navOpen}
          setNavOpen={setNavOpen}
          handleKeydown={handleKeydown}
          handleClick={handleClick}
        />
        <Nav
          navRef={navRef}
          navOpen={navOpen}
          setNavOpen={setNavOpen}
          firstItem={firstItem}
          lastItem={lastItem}
        />
      </div>
    </header>
  );
}

export default Header;
