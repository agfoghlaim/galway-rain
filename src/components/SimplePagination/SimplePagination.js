import React from 'react';
import { Link } from 'gatsby';
import classes from './simplePagination.module.scss';

export default function SimplePagination({ nextYear, prevYear }) {
  return (
    <div className={classes.simplePagination}>
      {prevYear && (
        <Link className={classes.prev} to={`/${prevYear}`}>
          &#129144; {prevYear}
        </Link>
      )}
      {nextYear && (
        <Link className={classes.next} to={`/${nextYear}`}>
          {nextYear}
          &#129146;
        </Link>
      )}
    </div>
  );
}
