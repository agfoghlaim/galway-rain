import React from 'react';
import classes from './burger.module.scss';

export default function Burger({
  navOpen,
  setNavOpen,
  handleKeydown,
  handleClick,
  menuBtnRef,
}) {
  return (
    <button
      ref={menuBtnRef}
      // I tested with NVDA screen reader and I don't think aria-haspopup & aria-controls are unnecesserary.
      // aria-haspopup="true"
      // aria-controls="menu1"
      className={`${classes.burger} ${navOpen ? classes.open : ''}`}
      onClick={() => setNavOpen(!navOpen)}
      onKeyDown={(e) => handleKeydown(e)}
      id="menubutton1"
      aria-expanded={navOpen}
      aria-label="Open Navigation Menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}
