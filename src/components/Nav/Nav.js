import React from 'react';
import { Link } from 'gatsby';
import classes from './nav.module.scss';

const links = [
  { id: 'li-1', name: 'Home', to: '/', tabindex: '0' },
  { id: 'li-2', name: 'Rainest', to: '/rainiest', tabindex: '0' },
  { id: 'li-3', name: 'Sweeper', to: '/sweeper', tabindex: '0' },
  // { id: 'li-4', name: 'Test 2020', to: '/2020', tabindex: '0' },
];

export default function Nav({
  navOpen,
  setNavOpen,
  firstItem,
  lastItem,
  navRef,
}) {
  return (
    <nav
      ref={navRef}
      className={`${classes.nav} ${navOpen ? classes.open : ''}`}
      aria-hidden={navOpen ? false : true}
    >
      <ul id="menu1" aria-hidden={navOpen ? false : true}>
        {links.map((link, i) => (
          <li key={link.id}>
            <Link
              onClick={() => setNavOpen(false)}
              ref={
                i === 0 ? firstItem : i === links.length - 1 ? lastItem : null
              }
              to={link.to}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
