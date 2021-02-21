import React from 'react';
import { Link } from 'gatsby';
import classes from './rainSweeper.module.scss';

import SEO from '../components/seo';
import RainSweeper from '../components/RainSweeper';

export default function RainSweeperPage({ data }) {
  return (
    <>
      <SEO pageTitle="RainSweeper" />
      <header id="top">
        <h1>
          RainSweeper
          <span>Data from Athenry weather station</span>
        </h1>
        <nav>

        <Link to="/">Home - See all days in order</Link>
        <Link to="/rainiest">The Rainiest Days</Link>
        <Link to="/rain-sweeper" style={{color: 'var(--orange)'}}>RainSweeper</Link>
        </nav>
      </header>
      <main>
      <RainSweeper classes={classes} />
      
      </main>
   
    </>
  );
}

// export const query = graphql`
//   query rainQuery {
//     allRainyDay(skip: 2860, limit: 100) {
//       nodes {
//         rain
//         date
//       }
//     }
//   }
// `;
