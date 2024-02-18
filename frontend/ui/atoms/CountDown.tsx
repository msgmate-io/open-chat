export default CountDown;

// from: https://stackoverflow.com/questions/40885923/countdown-timer-in-react

import React, { useState, useEffect, useRef } from "react";

export enum STATUS {
  STARTED = "Started",
  FINISHED = "Finished",
  STOPPED = "Stopped",
}

function CountDown({
  secondsRemaining,
  setSecondsRemaining,
  status,
  setStatus,
}) {
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.FINISHED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
    // passing null stops the interval
  );
  return <div>{twoDigits(secondsToDisplay)}</div>;
}

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = (num: number) => String(num).padStart(2, "0");
