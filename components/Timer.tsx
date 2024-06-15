import React, { Dispatch, SetStateAction, useEffect } from "react";

const Timer = ({
  seconds,
  minutes,
  setSeconds,
  setMinutes,
  allowedMinutes,
}: {
  seconds: number;
  minutes: number;
  setSeconds: Dispatch<SetStateAction<number>>;
  setMinutes: Dispatch<SetStateAction<number>>;
  allowedMinutes: number;
}) => {
  useEffect(() => {
    let timer = setInterval(() => {
      setSeconds(seconds + 1);

      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <div>
      <div className="absolute flex gap-3 top-5 right-5 p-5 bg-gray-900">
        Time
        <h1>
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </h1>
      </div>
    </div>
  );
};

export default Timer;
