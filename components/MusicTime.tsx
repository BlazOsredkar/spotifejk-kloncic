import React from "react";

const MusicTime = ({ currentTime }: { currentTime: number }) => {
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return <div>{formatTime(currentTime)}</div>;
};

export default MusicTime;
