import React from 'react';
import classes from './burger.module.scss';

export default function Burger({ navOpen, setNavOpen }) {
  return (
    <button
      className={`${classes.burger} ${navOpen ? classes.open : ''}`}
      onClick={() => setNavOpen(!navOpen)}
    >
      <div></div>
      <div></div>
      <div></div>
    </button>
  );
}
