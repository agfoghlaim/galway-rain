import React, { useState, useRef } from 'react';

import { Link } from 'gatsby';
import classes from './header.module.scss';
import { Burger, Nav } from '../';
import { useClickToCloseNav } from '../../hooks/useClickToCloseNav';

function Header({ siteTitle, siteDescription }) {
  const [navOpen, setNavOpen] = useState(false);
  const anywhereOnThePage = useRef(null);
  useClickToCloseNav(anywhereOnThePage, () => setNavOpen(false));

  return (
    <header ref={anywhereOnThePage} className={classes.header} id="top">
      <Link className={classes.logo} to="/">
        {siteTitle}
      </Link>
      <Burger navOpen={navOpen} setNavOpen={setNavOpen} />
      <Nav navOpen={navOpen} />
    </header>
  );
}

export default Header;
