import React, { useState } from 'react';
import { sweeperDate } from '../../util';

export default function Dry({
  data,
  handleDryClick,
  classes,
  game,
  handleKeyboard,
}) {
  const [flagged, setFlagged] = useState(false);

  const date = sweeperDate(data.date);

  function localHandleClick(e) {
    if (!game) return;
    if (data.checked) return;

    e.preventDefault();
    // e.currentTarget.focus();

    // Right Click | just set flag.
    if (e.type === 'contextmenu') {
      setFlagged(!flagged);
      return;
    } else {
      handleDryClick(data);
    }
  }

  function localHandleKeyboard(e) {
    e.preventDefault();
    if (e.key === 'Escape') {
      document.activeElement.parentElement.focus();
    }
    if (e.keyCode === 32) {
      setFlagged(!flagged);
      return;
    }
    if (e.key === 'Enter') {
      handleDryClick(data);
    }
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      handleKeyboard(data, e);
    }
    return;
  }

  return (
    <div
      id={data.i}
      // Set first square to [tabIndex=0]. The square probably shouldn't be in the natural tab order but this is the easiest solution I can come up with so keyboard only people can both play the game and skip the game. Setting tabIndex=-1 (can receive programmatic focus) means keyDown events won't fire because focus will never get to any of the squares. By setting the first square to tabIndex=0, when it's in focus the arrow events will work from there. When the squares are in focus (controlled with arrow buttons) both Tab and Escape will lift the focus out to the game wrapper div.
      tabIndex={data.i === 0 ? '0' : '-1'}
      className={`${classes.drySquare} ${
        data.checked ? classes['checked'] : ''
      }`}
      // style={{ background: `${data.checked ? 'none' : ''}` }}
      onClick={(e) => localHandleClick(e)}
      onContextMenu={(e) => localHandleClick(e)}
      onKeyDown={(e) => localHandleKeyboard(e)}
    >
      {data.checked && (
        <span
          className={classes.nasties}
          style={{
            color:
              data.numNastyNeighbours === 0
                ? 'var(--white)'
                : data.numNastyNeighbours === 1
                ? 'var(--green)'
                : data.numNastyNeighbours === 2
                ? 'var(--blue)'
                : 'var(--red)',
          }}
        >
          {data.numNastyNeighbours}
        </span>
      )}
      {flagged && !data.checked && (
        <span role="img" aria-label="Umbrella emoji">
          ☂️
        </span>
      )}

      <span className={classes.date}>{date}</span>
    </div>
  );
}
