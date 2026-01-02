import { useState, useEffect } from 'react';

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(seconds / 60);

  const handleStartPause = () => setIsRunning((r) => !r);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="timer">
      <span className="timer-display">{minutes} min</span>
      <button className="timer-btn" onClick={handleStartPause}>
        [{isRunning ? 'pause' : 'start'}]
      </button>
      <button className="timer-btn" onClick={handleReset}>
        [reset]
      </button>
    </div>
  );
}
