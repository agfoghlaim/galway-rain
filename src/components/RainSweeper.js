import React, { useState, useEffect, useRef } from 'react';
import {
  shuffleArray,
  getNeighbourToThe,
  shouldCheckInThisDirection,
  hasNastyNeighbour,
} from '../../util';
import { useStaticQuery, graphql } from 'gatsby';
import Wet from '../components/Wet';
import Dry from '../components/Dry';

import { DIRECTIONS } from '../../constants';
import GameInfo from './GameInfo';

/**
 *
 * Make sure that NUM_DAYS_IN_ROW is a factor of NUM_DAYS_IN_A_GAME otherwise the board won't be even and bad things that i haven't checked for will probably happen.
 *
 */

// Quick and filty solution to give people on mobile a chance.
export const NUM_DAYS_IN_ROW = 8;
export const NUM_DAYS_IN_GAME =  96;
// export const NUM_DAYS_IN_ROW = window.innerWidth > 500 ? 10 : 5;
// export const NUM_DAYS_IN_GAME = window.innerWidth > 500 ? 100 : 100;

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

  const skipRef = useRef(null);

  // !game means game over.
  const [game, setGame] = useState(true);
  const [win, setWin] = useState(false);

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
      setWin(true);
    }
  }, [setGame, game, realData, setWin]);

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

  function handleDryClick(datum) {
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
          const thisOne = getNeighbourToThe(
            datum.i,
            direction,
            NUM_DAYS_IN_GAME,
            NUM_DAYS_IN_ROW
          );
          handleDryClick(realData[thisOne]);
        }
      });
    }
  }
  function setTheFocus(current) {
    return {
      down: () => {
        const swichFocusTo = document.getElementById(current + NUM_DAYS_IN_ROW);
        if (!swichFocusTo) return;
        swichFocusTo.focus();
      },
      up: () => {
        const swichFocusTo = document.getElementById(current - NUM_DAYS_IN_ROW);
        if (!swichFocusTo) return;
        swichFocusTo.focus();
      },
      left: () => {
        const swichFocusTo = document.getElementById(current - 1);
        if (!swichFocusTo) return;
        swichFocusTo.focus();
      },
      right: () => {
        const swichFocusTo = document.getElementById(current + 1);
        if (!swichFocusTo) return;
        swichFocusTo.focus();
      },
    };
  }

  function handleKeyboard( _, e) {
    if (e.key === 'ArrowDown') {
      setTheFocus(+document.activeElement.id).down();
    }
    if (e.key === 'ArrowUp') {
      setTheFocus(+document.activeElement.id).up();
    }
    if (e.key === 'ArrowRight') {
      setTheFocus(+document.activeElement.id).right();
    }
    if (e.key === 'ArrowLeft') {
      setTheFocus(+document.activeElement.id).left();
    }
  }

  return (
    <div className={classes.rainSweeperWrap}>
      <GameInfo
        classes={classes}
        startNewGame={startNewGame}
        game={game}
        win={win}
      />

      <div
        tabIndex="0"
        ref={skipRef}
        className={classes.sweepWrap}
        style={{ gridTemplateColumns: `repeat(${NUM_DAYS_IN_ROW}, 2.8rem)` }}
      >
        {realData?.length &&
          realData.map((rainyDay, i) => {
            rainyDay.i = i;
            if (rainyDay.rain > 0) {
              return (
                <Wet
                  setTheFocus={setTheFocus}
                  handleKeyboard={handleKeyboard}
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
                  handleKeyboard={handleKeyboard}
                  setTheFocus={setTheFocus}
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
