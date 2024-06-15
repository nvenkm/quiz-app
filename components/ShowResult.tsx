import React from "react";
import { QuizQuestionInterface } from "./Quiz";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { MdFullscreenExit } from "react-icons/md";
const ShowResult = ({
  selectedAnswers,
  data,
  handleFullScreen,
}: {
  selectedAnswers: string[];
  data: QuizQuestionInterface[];
  handleFullScreen: () => void;
}) => {
  const handle = useFullScreenHandle();
  let correctAnswers = 0;
  selectedAnswers.forEach((answer, index) => {
    if (answer === data[index].answer) {
      correctAnswers++;
    }
  });

  return (
    <FullScreen handle={handle}>
      <div className="flex flex-col justify-center items-center gap-20 h-screen">
        <div className="flex flex-col  items-center justify-between gap-10 border rounded-md p-5">
          <h1 className="text-3xl font-bold">Your Answers</h1>
          <div className="flex justify-center items-center gap-3 flex-wrap">
            {selectedAnswers.map((answer, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor:
                      data[index].answer === answer ? "#009900" : "#d94949",
                  }}
                  className="border border-white rounded-md p-3"
                >
                  {answer}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col border rounded-md px-8 py-10 items-center justify-between gap-10">
          <h1 className="text-3xl font-bold ">Your Result</h1>
          <div className="text-3xl font-bold">{correctAnswers}/10</div>
          <div className="text-3xl font-bold">
            {correctAnswers < 5
              ? "You need to watch more bollywood movies 🥲 "
              : correctAnswers < 7
              ? "You did pretty good 😁"
              : correctAnswers < 9
              ? "You have good bollywood knowledge 😎"
              : "Wow! You are a bollywood pro 🎉"}
          </div>
        </div>
        <div>
          <button
            onClick={handleFullScreen}
            className="absolute top-5 right-5 border border-white p-3 rounded-sm flex items-center justify-center gap-5"
          >
            <MdFullscreenExit size={30} />
          </button>
        </div>
      </div>
    </FullScreen>
  );
};

export default ShowResult;
