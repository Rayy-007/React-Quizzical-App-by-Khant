import React from "react";
import AnswerButton from "./AnswerButton";
function Questions({
  id,
  questions,
  answers,
  correctAnswer,
  checkAnswer,
  isSelectedAllAnswers,
  checkedAnswer,
}) {
  return (
    <div className="quiz">
      <h3>{questions}</h3>
      <div className="quiz-btn-container flex">
        <AnswerButton
          id={id}
          checkAnswer={checkAnswer}
          answers={answers}
          correctAnswer={correctAnswer}
          isSelectedAllAnswers={isSelectedAllAnswers}
          checkedAnswer={checkedAnswer}
        />
      </div>
      <hr />
    </div>
  );
}

export default Questions;
