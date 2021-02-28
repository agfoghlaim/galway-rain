import { graphql } from 'gatsby';
import React from 'react';

import '../styles/global.css';

import SEO from '../components/seo';
import BackToTop from '../components/BackToTop';
import { RainyList } from '../components';
import { SimplePagination } from '../components';


export default function IndexPage({ data }) {
  return (
    <>
      <SEO pageTitle="Rainy Days" />

      <main>
        <h1>
          Was it raining or not (since 2010)?
          <span>Data from Athenry weather station</span>
        </h1>
        <SimplePagination nextYear="2011" />
        <RainyList data={data} />
      </main>
      <BackToTop />
    </>
  );
}

// original query
// export const query = graphql`
//   query MyQuery {
//     allRainyDay {
//       nodes {
//         rain
//         date
//         id
//       }
//     }
//   }
// `;

export const query = graphql`
  query twentyTen {
    allRainyDay(filter: { date: { regex: "/2010/" } }) {
      nodes {
        id
        rain
        date
      }
    }
  }
`;
