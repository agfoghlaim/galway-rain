import React from 'react';
import classes from './rainyList.module.scss';
import { niceDate } from '../../../util';
export default function RainyList({ data }) {
  return (
    <div className={classes.rainWrap}>
      {data.allRainyDay.nodes.map((rainyDay) => {
        // if(rainyDay.date.contains('01-jan-'))
        const date = niceDate(rainyDay.date);
        if (+rainyDay.rain > 0) {
          return (
            <div
              className={classes.rain}
              key={rainyDay.id}
              style={{
                background: `var(--lightBlue)`,
                filter: `hue-rotate(${rainyDay.rain * 18}deg)`,
              }}
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
  );
}
