import { graphql, Link } from 'gatsby';
import * as React from 'react';

import SEO from '../components/seo';

import '../styles/global.css';
import classes from './rainiest.module.scss';

export default function RainiestPage({ data }) {

  return (
    <>
    <SEO pageTitle="The Rainest Days" />
		<header>

		<h1 >The rainiest days since 2010. <span>Data from Athenry weather station.</span></h1>
		<Link to='/'>See all days in order</Link>
		</header>
    <main>
      <div className={classes.rainWrap}>
        {data.allRainyDay.nodes.map((rainyDay) => {
          const date = new Date(rainyDay.date).toString().substring(0, 15);
          if (+rainyDay.rain > 0) {
            return (
              <div className={classes.rain} key={rainyDay.id}
							style={{background: `rgba(255, 50, 10, ${rainyDay.rain/100 + 0.5})`}}
							>
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
  query MyOtherQuery {
    allRainyDay(sort: {fields: rain, order: DESC}) {
      nodes {
        rain
        date
        id
      }
    }
  }
`;
