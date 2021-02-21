import { graphql, Link } from 'gatsby';
import React from 'react';

import '../styles/global.css';

import SEO from '../components/seo';
import BackToTop from '../components/BackToTop';
import RainyList from '../components/RainyList';

export default function IndexPage({ data }) {
  return (
    <>
      <SEO pageTitle="Rainy Days" />
      <header id="top">
        <h1>
          Was it raining or not (since 2010)?
          <span>Data from Athenry weather station</span>
        </h1>
        <nav>

        <Link to="/" style={{color: 'var(--orange)'}}>Home - See all days in order</Link>
        <Link to="/rainiest" >The Rainiest Days</Link>
        <Link to="/rain-sweeper" >RainSweeper</Link>
        </nav>
      </header>
      <main>
        <RainyList data={data} />
      </main>
      <BackToTop />
    </>
  );
}

export const query = graphql`
  query MyQuery {
    allRainyDay {
      nodes {
        rain
        date
        id
      }
    }
  }
`;
