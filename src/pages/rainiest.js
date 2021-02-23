import { graphql } from 'gatsby';
import * as React from 'react';

import '../styles/global.css';

import SEO from '../components/seo';
import BackToTop from '../components/BackToTop';
import { RainyList } from '../components';

export default function RainiestPage({ data }) {
  return (
    <>
      <SEO pageTitle="The Rainest Days" />

      <main>
        <h1>
          The rainiest days since 2010.{' '}
          <span>Data from Athenry weather station.</span>
        </h1>
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
