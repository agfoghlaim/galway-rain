import { graphql } from 'gatsby';
import React from 'react';

import '../styles/global.css';

import SEO from '../components/seo';
import BackToTop from '../components/BackToTop';
import { RainyList } from '../components';
import { SimplePagination } from '../components';

export default function OneYearTemplate({ data, pageContext }) {

  const {year, prevYear, nextYear} = pageContext;

  return (
    <>
      <SEO pageTitle={`Galway rain in ${year}`} />

      <main>
        <h1>
          Was it raining or not in the year {year}?
          <span>Data from Athenry weather station</span>
        </h1>

        <SimplePagination nextYear={nextYear} prevYear={prevYear} />
        <RainyList data={data} />
        <SimplePagination nextYear={nextYear} prevYear={prevYear} />
      </main>
      <BackToTop />
    </>
  );
}

export const query = graphql`
query($yearRegex: String! ) {
  allRainyDay(filter: {date: {regex: $yearRegex }}) {
    nodes {
      id
      date
      rain
    }
  }
}

`;
