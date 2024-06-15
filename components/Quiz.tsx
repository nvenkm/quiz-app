"use client";
import React, { useEffect, useRef, useState } from "react";
import QuizQuestion from "./QuizQuestion";
import ShowResult from "./ShowResult";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
export interface QuizQuestionInterface {
  question: string;
  options: string[];
  answer: string;
}
import { MdFullscreen } from "react-icons/md";
import Timer from "./Timer";

const Quiz = ({ data }: { data: QuizQuestionInterface[] }) => {
  //all the global states getting from local storage
  const allowedMinutes = 10;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedCurrentQuestionIndex = localStorage.getItem(
      "currentQuestionIndex"
    );
    if (savedCurrentQuestionIndex) {
      return JSON.parse(savedCurrentQuestionIndex);
    }
    return 0;
  });
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(() => {
    const savedSelectedAnswers = localStorage.getItem("selectedAnswers");
    if (savedSelectedAnswers) {
      return JSON.parse(savedSelectedAnswers);
    }
    return [];
  });
  const [showResult, setShowResult] = useState(() => {
    const savedShowResult = localStorage.getItem("showResult");
    if (savedShowResult) {
      return JSON.parse(savedShowResult);
    }
    return false;
  });
  const [seconds, setSeconds] = useState(() => {
    const savedSeconds = localStorage.getItem("seconds");
    if (savedSeconds) {
      return JSON.parse(savedSeconds);
    }
    return 0;
  });
  const [minutes, setMinutes] = useState(() => {
    const savedMinutes = localStorage.getItem("minutes");
    if (savedMinutes) {
      return JSON.parse(savedMinutes);
    }
    return 0;
  });
  const handle = useFullScreenHandle();
  const quizAppRef = useRef(null);

  //update the state from local storage
  useEffect(() => {
    localStorage.setItem(
      "currentQuestionIndex",
      JSON.stringify(currentQuestionIndex)
    );
  }, [currentQuestionIndex]);

  useEffect(() => {
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  useEffect(() => {
    localStorage.setItem("minutes", JSON.stringify(minutes));
  }, [minutes]);

  useEffect(() => {
    localStorage.setItem("seconds", JSON.stringify(seconds));
  }, [seconds]);

  useEffect(() => {
    localStorage.setItem("showResult", JSON.stringify(showResult));
  }, [showResult]);

  //getting the state from local storage
  useEffect(() => {
    const savedCurrentQuestionIndex = localStorage.getItem(
      "currentQuestionIndex"
    );
    const savedSelectedAnswers = localStorage.getItem("selectedAnswers");
    const savedMinutes = localStorage.getItem("minutes");
    const savedSeconds = localStorage.getItem("seconds");
    const savedShowResult = localStorage.getItem("showResult");

    if (savedCurrentQuestionIndex !== null) {
      setCurrentQuestionIndex(JSON.parse(savedCurrentQuestionIndex));
    }
    if (savedSelectedAnswers !== null) {
      setSelectedAnswers(JSON.parse(savedSelectedAnswers));
    }
    if (savedMinutes !== null) {
      setMinutes(JSON.parse(savedMinutes));
    }
    if (savedSeconds !== null) {
      setSeconds(JSON.parse(savedSeconds));
    }
    if (savedShowResult !== null) {
      setShowResult(JSON.parse(savedShowResult));
    }
  }, []);

  //removing the state when the quiz is over
  useEffect(() => {
    if (showResult) {
      localStorage.removeItem("currentQuestionIndex");
      localStorage.removeItem("selectedAnswers");
      localStorage.removeItem("minutes");
      localStorage.removeItem("seconds");
      localStorage.removeItem("showResult");
    }
  }, [showResult]);

  //handler functions
  function handleSelectAnswer(answer: string) {
    setSelectedAnswers((prevAnswers) => [...prevAnswers, answer]);
    handleChangeQuestion();
  }

  function handleChangeQuestion() {
    if (currentQuestionIndex >= data.length - 1) {
      setShowResult(true);
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handleFullScreen() {
    if (handle.active) {
      handle.exit();
      return;
    }
    handle.enter();
  }

  useEffect(() => {
    if (minutes === allowedMinutes) {
      setShowResult(true);
    }
  }, [minutes]);

  return (
    <FullScreen handle={handle}>
      {showResult ? (
        <ShowResult
          handleFullScreen={handleFullScreen}
          data={data}
          selectedAnswers={selectedAnswers}
        />
      ) : (
        <div>
          {!handle.active ? (
            <div className="flex flex-col gap-5">
              <p className="text-xl">
                This quiz is only available in fullscreen
              </p>
              <button
                onClick={handleFullScreen}
                className="border border-white p-3 rounded-sm flex items-center justify-center gap-5"
              >
                Enter Fullscreen <MdFullscreen size={30} />
              </button>
            </div>
          ) : (
            <div
              ref={quizAppRef}
              className="flex h-screen flex-col items-center justify-center gap-8"
            >
              <>
                <QuizQuestion
                  handleSelectAnswer={handleSelectAnswer}
                  currentQuestionIndex={currentQuestionIndex}
                  question={data[currentQuestionIndex]}
                  handleChangeQuestion={handleChangeQuestion}
                />
                <Timer
                  seconds={seconds}
                  minutes={minutes}
                  setSeconds={setSeconds}
                  setMinutes={setMinutes}
                  allowedMinutes={allowedMinutes}
                />
              </>
            </div>
          )}
        </div>
      )}
    </FullScreen>
  );
};

export default Quiz;
