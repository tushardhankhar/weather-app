import React, { useState, useEffect } from "react";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be converted to 12
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedHours = hours.toString().padStart(2, "0");

    return `${formattedHours}:${minutes}:${seconds} ${ampm}`;
  };

  return <h2> {formatTime(currentTime)}</h2>;
};

export default CurrentTime;
