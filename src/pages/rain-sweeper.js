import React from 'react';

import classes from './rainSweeper.module.scss';

import SEO from '../components/seo';
import RainSweeper from '../components/RainSweeper';

export default function RainSweeperPage({ data }) {
  return (
    <>
      <SEO pageTitle="RainSweeper" />

      <main>
      <h1>
        RainSweeper
        <span>Data from Athenry weather station</span>
      </h1>
        <RainSweeper classes={classes} />
      </main>
    </>
  );
}
