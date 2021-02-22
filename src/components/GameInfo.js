import React from 'react';

export default function GameInfo({ classes, startNewGame, game, win }) {
  return (
    <div className={classes.gameInfo}>
      <>
        <p>
          <span role="img" aria-label="Unbrella emoji">
            ☂️{' '}
          </span>
          <span className={classes.gameInfoText}>
            {game ? 'Game on!!' : 'Game Over'}
          </span>
          {!game && win ? (
            <span role="img" aria-label="Smileing emoji">
              {' '}
              😃
            </span>
          ) : game && !win ? (
            <span role="img" aria-label="Thinking emoji">
              {' '}
              🤔
            </span>
          ) : (
            <span role="img" aria-label="Sob emoji">
              {' '}
              😭
            </span>
          )}
          <span className={classes.temp2}>Refresh page for new game</span>
        </p>

        <button onClick={() => startNewGame()}>
          <span className={classes.temp1}>New Game</span>
          <span className={classes.temp2}>Button coming soon!</span>
        </button>
      </>
    </div>
  );
}
