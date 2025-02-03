import React, { useState, useEffect } from "react";
import "./App.css";

function UnderConstruction() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let launchTimestamp = localStorage.getItem("launchTimestamp");

    // If launchTimestamp is not set, set it for the first time (81 days from now)
    if (!launchTimestamp) {
      launchTimestamp = new Date().getTime() + 81 * 24 * 60 * 60 * 1000;
      localStorage.setItem("launchTimestamp", launchTimestamp);
    } else {
      launchTimestamp = parseInt(launchTimestamp, 10);
    }

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = launchTimestamp - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      }
    };

    // Update countdown every second
    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Run immediately once

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="construction-container">
      <h1>🚧 Coming Soon! 🚧</h1>
      <p>Our website is under construction. Stay tuned!</p>

      {timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0 ? (
        <p>🎉 The website has launched! Stay tuned for more updates.</p>
      ) : (
        <>
          <p>Launching in:</p>
          <div className="countdown-timer">
            <div className="timer-box">
              <span>{timeLeft.days}</span>
              <p>Days</p>
            </div>
            <div className="timer-box">
              <span>{timeLeft.hours}</span>
              <p>Hours</p>
            </div>
            <div className="timer-box">
              <span>{timeLeft.minutes}</span>
              <p>Minutes</p>
            </div>
            <div className="timer-box">
              <span>{timeLeft.seconds}</span>
              <p>Seconds</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      {/* Website Name with Holographic Effect */}
      <div className="website-name" data-reflect="Your Website Name">
        eBooksHub
      </div>

      <UnderConstruction />
    </div>
  );
}

export default App;
