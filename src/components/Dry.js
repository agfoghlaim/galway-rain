import React, { useState } from 'react';
import { sweeperDate } from '../../util';

export default function Dry({ data, handleDryClick, classes, game }) {
  const [flagged, setFlagged] = useState(false);

  const date = sweeperDate(data.date);

  function localHandleClick(e) {
    if (!game) return;
    if (data.checked) return;
    e.preventDefault();

    // Right Click | just set flag.
    if (e.type === 'contextmenu') {
      setFlagged(!flagged);
      return;
    } else {
      handleDryClick(data, e);
    }
  }

  return (
    <div
      className={`${classes.drySquare} ${
        data.checked ? classes['checked'] : ''
      }`}
      // style={{ background: `${data.checked ? 'none' : ''}` }}
      onClick={(e) => localHandleClick(e)}
      onContextMenu={(e) => localHandleClick(e)}
    >
      {data.checked && (
        <span
          className={classes.nasties}
          style={{
            color:
              data.numNastyNeighbours === 1
                ? 'var(--green)'
                : data.numNastyNeighbours === 2
                ? 'var(--blue)'
                : 'var(--red)',
          }}
        >
          {data.numNastyNeighbours > 0 && data.numNastyNeighbours}
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
