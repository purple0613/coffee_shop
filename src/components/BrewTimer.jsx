import React, { useState, useEffect } from 'react';

export default function BrewTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="notebook-timer-panel">
      <div>
        <div className="timer-handwritten-label">
          ⏱ Barista Brew Stopwatch
        </div>
        <div className="timer-digits-styled" id="brew-stopwatch-display">
          {formatTime(seconds)}
        </div>
      </div>

      <div className="timer-buttons-wrap">
        <button 
          id="toggle-timer-btn"
          className="btn-journal-timer btn-timer-ink-gold" 
          onClick={toggleTimer}
          aria-label={isActive ? "Pause timer" : "Start timer"}
        >
          {isActive ? "⏸ Pause" : "▶ Start Brew"}
        </button>
        <button 
          id="reset-timer-btn"
          className="btn-journal-timer btn-timer-ink-outline" 
          onClick={resetTimer}
          aria-label="Reset timer"
        >
          ↺ Reset
        </button>
      </div>
    </div>
  );
}
