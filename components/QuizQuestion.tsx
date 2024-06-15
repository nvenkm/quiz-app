import { QuizQuestionInterface } from "./Quiz";
import { AnimatePresence, motion } from "framer-motion";

const QuizQuestion = ({
  question,
  currentQuestionIndex,
  handleSelectAnswer,
  handleChangeQuestion,
}: {
  question: QuizQuestionInterface;
  currentQuestionIndex: number;
  handleSelectAnswer: (answer: string) => void;
  handleChangeQuestion: () => void;
}) => {
  // for animation
  const variants = {
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 200 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentQuestionIndex}
        className="flex flex-col gap-10"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <div className="text-3xl font-bold">{`${currentQuestionIndex + 1}. ${
          question.question
        }`}</div>
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <button
              onClick={() => handleSelectAnswer(option)}
              className="border border-white p-3 rounded-md"
              key={index}
            >
              {option}
            </button>
          ))}
        </div>

        {/* <button
        className="border border-white py-3 px-5 w-fit mx-auto"
        onClick={handleChangeQuestion}
        >
        Next
        </button> */}
      </motion.div>
    </AnimatePresence>
  );
};

export default QuizQuestion;
