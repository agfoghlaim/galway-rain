import React from 'react';
import { Link } from 'gatsby';
import classes from './nav.module.scss';

export default function Nav({ navOpen }) {
  return (
    <nav className={`${classes.nav} ${navOpen ? classes.open : ''}`}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/rainiest">The Rainiest Days</Link>
        </li>
        <li>
          <Link to="/rain-sweeper">RainSweeper</Link>
        </li>
      </ul>
    </nav>
  );
}
