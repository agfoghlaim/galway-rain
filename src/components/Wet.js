import React, { useState } from 'react';
import { sweeperDate } from '../../util';

export default function Wet({ data, handleWetClick, classes, game }) {
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
  return (
    <div
      style={{
        // background: `${data.checked ? 'none' : 'rgb(240,240,240)'}`,
        background: `${data.checked ? 'none' : '#fff'}`,
        border: `${data.culprit ? '0.2rem solid var(--red)' : ''}`,
      }}
      className={classes.wetSquare}
      onClick={(e) => localHandleClick(e)}
      onContextMenu={(e) => localHandleClick(e)}
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
