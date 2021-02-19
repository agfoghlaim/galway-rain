import React from 'react';
import classes from './rainyList.module.scss';

export default function RainyList({ data }) {
  return (
    <div className={classes.rainWrap}>
      {data.allRainyDay.nodes.map((rainyDay) => {
        const dateInFormatFirefoxLikes = rainyDay.date.replace(/-/g,'/');
        const date = new Date(dateInFormatFirefoxLikes).toString().substring(0, 15);
        if (+rainyDay.rain > 0) {
          return (
            <div
              className={classes.rain}
              key={rainyDay.id}
              style={{
                background: `lightgreen`,
                filter: `hue-rotate(${rainyDay.rain * 10}deg)`,
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
