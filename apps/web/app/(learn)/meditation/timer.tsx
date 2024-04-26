import React, { useState, useEffect } from 'react';

function Timer() {
  const [selectedTime, setSelectedTime] = useState(300); // Default time: 5 minutes
  const [timeLeft, setTimeLeft] = useState(selectedTime);
  const [timerActive, setTimerActive] = useState(false);

  // Function to format time
  function formatTime(seconds:number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Function to start the timer
  function startTimer(duration:number) {
    setTimerActive(true);
    setTimeLeft(duration);

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    // Cleanup function to clear interval when component unmounts or timer reaches 0
    return () => clearInterval(timerInterval);
  }

  // Effect to start timer when selectedTime changes
  useEffect(() => {
    if (timerActive) return;

    startTimer(selectedTime);
  }, [selectedTime, timerActive]);

  // Event handler for when a time option is selected
  function handleTimeChange(event:any) {
    setSelectedTime(parseInt(event.target.value)); // Convert to integer
    setTimerActive(false); // Reset timer
  }

  return (
    <div>
      <select value={selectedTime} onChange={handleTimeChange}>
        <option value={300}>5 Minutes</option>
        <option value={600}>10 Minutes</option>
        <option value={900}>15 Minutes</option>
        <option value={1800}>30 Minutes</option>
        <option value={3600}>1 Hour</option>
      </select>
      <div>{formatTime(timeLeft)}</div>
    </div>
  );
}

export default Timer;
