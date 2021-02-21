import React, { useState, useEffect } from 'react';
import {
  shuffleArray,
  getNeighbourToThe,
  shouldCheckInThisDirection,
  hasNastyNeighbour,
} from '../../util';
import { useStaticQuery, graphql } from 'gatsby';
import Wet from '../components/Wet';
import Dry from '../components/Dry';

import { DIRECTIONS, NUM_DAYS_IN_ROW, NUM_DAYS_IN_GAME } from '../../constants';

/**
 *
 * When a <Dry> day is clicked, it's tricky to check neighbouring days and manage re-renders. Push all neighbours to be checked/revealed in here and update state all at once.
 *
 */
const KEEP_TRACK = [];

function addNumNastyNeighboursToShuffledData(days) {
  for (let i = 0; i < days.length; i++) {
    let numNastyNeighbours = 0;

    DIRECTIONS.forEach((direction) => {
      if (
        shouldCheckInThisDirection(i)[direction]() &&
        hasNastyNeighbour(i, direction, days)
      ) {
        numNastyNeighbours++;
      }
    });

    days[i].numNastyNeighbours = numNastyNeighbours;
  }
  return days;
}

const RainSweeper = ({ classes, width }) => {
  // There are way more wet days so to make game winnable get wet/dry days in a nice proportion.
  const winnable = useStaticQuery(
    graphql`
      query winnableQuery {
        dry: allRainyDay(filter: { rain: { eq: 0 } }, limit: 500) {
          nodes {
            rain
            date
          }
        }
        wet: allRainyDay(
          filter: { rain: { lt: 50, gt: 10 } }
          limit: 100
          sort: { fields: rain, order: DESC }
        ) {
          nodes {
            rain
            date
          }
        }
      }
    `
  );

  // Concat wet/dry days, shuffle and slice off NUM_DAYS_IN_A_GAME
  const allData = winnable.dry.nodes.concat(winnable.wet.nodes);
  const shuffled = shuffleArray(allData).slice(0, NUM_DAYS_IN_GAME);

  function startNewGame() {
		// TODO....
  }

  // !game means game over.
  const [game, setGame] = useState(true);

  // Data actually used in the game. Will be NUM_DAYS_IN_GAME long.
  const [realData, setRealData] = useState();

  // Go through shuffled and add on a value for num rainy days surrounding it on the board.
  useEffect(() => {
    const nastyNeighbours = addNumNastyNeighboursToShuffledData(shuffled);
    setRealData(nastyNeighbours);
  }, []);

  // Check if game should be over. This is for successful scenario. <Wet/> sets setGame(false) if a rainy day is clicked.
  useEffect(() => {
    function checkGameOver() {
      // over success if... game is true & all dry are checked?
      const copy = realData;
      const numDryDaysUnchecked = copy.filter((day) => day.rain === 0);
      const maybeOver = numDryDaysUnchecked.filter((dryDay) => !dryDay.checked);

      if (!maybeOver.length) {
        return true;
      }
      return false;
    }
    if (!realData) return;
    if (!game) return;

    const isGameOver = checkGameOver();
    if (isGameOver) {
      setGame(false);
    }
  }, [setGame, game, realData]);

  function handleWetClick(data, e) {
    e.preventDefault();
    setGame(false);

    // set which day done it...
    const badDay = data.i;

    const copy = realData;
    const updated = copy.map((item) => {
      if (item.i === badDay) {
        return {
          ...item,
          culprit: true,
        };
      }
      return item;
    });
    setRealData(updated);
  }

  function doTheUpdate() {
    // update state with KEEP_TRACK. Set clicked <Dry/> to checked as well as any of it's neighbours.
    const copy = realData;
    const updated = copy.map((item) => {
      if (KEEP_TRACK.includes(item.i)) {
        return {
          ...item,
          checked: true,
        };
      }
      return item;
    });
    setRealData(updated);
  }

  function handleDryClick(datum, e) {
    const isChecked = KEEP_TRACK.filter((w) => w === datum.i);

    // return if this day has already been checked
    if (isChecked.length) return;

    const numNastyNeighbours = realData[datum.i].numNastyNeighbours;

    // if this day has MORE than ZERO rainy days (bombs) surrounding it, push it into KEEP_TRACK so it won't get checked again. Then update state and return.
    if (numNastyNeighbours !== 0) {
      KEEP_TRACK.push(datum.i);

      doTheUpdate(KEEP_TRACK);
      return;
    }

    // if this day has ZERO rainy days surrounding it, also push it into KEEP_TRACK so it won't get checked again. Also send it to checkNeighbour() to 'click' on it's surrounding days.
    KEEP_TRACK.push(datum.i);
    checkNeighbour(datum);

    // If we get to here, the original day that was clicked on & all it's relevant neighbours are in KEEP_TRACK array.
    doTheUpdate(KEEP_TRACK);

    function checkNeighbour(datum) {
      // Find days in each direction, 'click' on them.
      DIRECTIONS.forEach((direction) => {
        if (shouldCheckInThisDirection(datum.i)[direction]()) {
          const thisOne = getNeighbourToThe(datum.i, direction);
          handleDryClick(realData[thisOne]);
        }
      });
    }
  }

  return (
    <div className={classes.rainSweeperWrap}>
      <div className={classes.gameOver}>
        {!game && (
          <>
            <p>
              <span role="img" aria-label="Unbrella emoji">
                ☂️
              </span>
              Game Over
              <span role="img" aria-label="Sob emoji">
                😭
              </span>
              <span className={classes.temp2}>Refresh page for new game</span>
            </p>

            <button onClick={() => startNewGame()}>
              <span className={classes.temp1}>New Game</span>
              <span className={classes.temp2}>Button coming soon!</span>
            </button>
          </>
        )}
      </div>

      <div
        className={classes.sweepWrap}
        style={{ gridTemplateColumns: `repeat(${NUM_DAYS_IN_ROW}, 3rem)` }}
      >
        {realData?.length &&
          realData.map((rainyDay, i) => {
            rainyDay.i = i;
            if (rainyDay.rain > 0) {
              return (
                <Wet
                  game={game}
                  classes={classes}
                  key={i}
                  data={rainyDay}
                  checked={rainyDay.checked}
                  handleWetClick={handleWetClick}
                />
              );
            } else {
              return (
                <Dry
                  classes={classes}
                  key={i}
                  handleDryClick={handleDryClick}
                  data={rainyDay}
                  game={game}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default RainSweeper;
