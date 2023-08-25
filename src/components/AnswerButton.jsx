import React from "react";
import { decode } from "html-entities";
function AnswerButton({
  id,
  answers,
  correctAnswer,
  checkAnswer,
  isSelectedAllAnswers,
  checkedAnswer,
}) {
  return answers?.map((answer) => (
    <div
      onClick={() => {
        checkAnswer(id, answer);
      }}
      key={answer}
      className={`quiz-radio-con flex`}
    >
      <input id={answer} type="radio" name={answers} />
      <label
        htmlFor={answer}
        className={`quiz-btn ${
          isSelectedAllAnswers
            ? correctAnswer === answer
              ? "correct"
              : checkedAnswer === answer
              ? "incorrect"
              : "disable"
            : "normal"
        }`}
      >
        {decode(answer)}
      </label>
    </div>
  ));
}

export default React.memo(AnswerButton);
