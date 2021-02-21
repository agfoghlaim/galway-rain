import { graphql, Link } from 'gatsby';
import * as React from 'react';

import SEO from '../components/seo';

import '../styles/global.css';
import BackToTop from '../components/BackToTop';
import RainyList from '../components/RainyList';

export default function RainiestPage({ data }) {
  return (
    <>
      <SEO pageTitle="The Rainest Days" />
      <header id="top">
        <h1>
          The rainiest days since 2010.{' '}
          <span>Data from Athenry weather station.</span>
        </h1>
        <nav>

        <Link to="/">Home - See all days in order</Link>
        <Link to="/rainiest" style={{color: 'var(--orange)'}}>The Rainiest Days</Link>
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
  query MyOtherQuery {
    allRainyDay(sort: { fields: rain, order: DESC }) {
      nodes {
        rain
        date
        id
      }
    }
  }
`;
