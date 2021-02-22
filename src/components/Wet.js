import React, { useState } from 'react';
import { sweeperDate } from '../../util';

export default function Wet({
  data,
  handleWetClick,
  classes,
  game,
  handleKeyboard,
}) {
  const [flagged, setFlagged] = useState(false);

  function localHandleClick(e) {
    if (!game) return;

    // Right Click | just set flag.
    if (e.type === 'contextmenu') {
      e.preventDefault();
      setFlagged(!flagged);
      return;
    } else {
      handleWetClick(data, e, flagged);
    }
  }

  function localHandleKeyboard(e) {
    if (e.key === 'Escape') {
      document.activeElement.parentElement.focus();
    }

    if (e.keyCode === 32) {
      // space
      setFlagged(!flagged);
      return;
    }
    if (e.key === 'Enter') {
      handleWetClick(data, e);
    }
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    
      handleKeyboard(data, e);
    }
    return;
  }

  return (
    <div
      id={data.i}
      tabIndex={data.i === 0 ? '0' : '-1'}
      style={{
        // background: `${data.checked ? 'none' : 'rgb(230,230,230)'}`,
         background: `${data.checked ? 'none' : '#fff'}`,
        border: `${data.culprit ? '0.2rem solid var(--red)' : ''}`,
      }}
      className={classes.wetSquare}
      onClick={(e) => localHandleClick(e)}
      onContextMenu={(e) => localHandleClick(e)}
      onKeyDown={(e) => localHandleKeyboard(e)}
    >
      {flagged && (
        <span role="img" aria-label="Umbrella emoji">
          ☂️
        </span>
      )}
      {!game && (
        <span role="img" aria-label="Bomb emoji">
          🌧️
        </span>
      )}
      <span className={classes.date}>{sweeperDate(data.date)}</span>
    </div>
  );
}
