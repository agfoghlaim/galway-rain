import { graphql, Link } from 'gatsby';
import * as React from 'react';

import SEO from '../components/seo';

import '../styles/global.css';
import classes from './index.module.scss';

export default function IndexPage({ data }) {

  return (
    <>
    <SEO pageTitle="Rainy Days" />
      <header>

      <h1>Was it raining or not (since 2010)?<span>Data from Athenry weather station</span></h1>
      <Link to='/rainiest'>Go to Rainiest Days</Link>
      </header>
    <main>
      <div className={classes.rainWrap}>
        {data.allRainyDay.nodes.map((rainyDay) => {
          const date = new Date(rainyDay.date).toString().substring(0, 15);
          if (+rainyDay.rain > 0) {
            return (
              <div className={classes.rain} key={rainyDay.id}>
                <span role="img" aria-label="Sunglasses smiley emoji">
                  🌧️
                </span>
                <span>{date}</span>
                <span className={classes.mm}>{rainyDay.rain}mm</span>
              </div>
            );
          } else {
            return (
              <div className={classes.shine} key={rainyDay.id}>
                <span role="img" aria-label="Sunglasses smiley emoji">
                  😎
                </span>
                <span>{date}</span>
                <span className={classes.mm}>{rainyDay.rain}mm</span>
              </div>
            );
          }
        })}
      </div>
    </main>
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
