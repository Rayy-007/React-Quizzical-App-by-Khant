import React from "react";
import { Link } from "react-router-dom";
import Questions from "./Questions";
import { nanoid } from "nanoid";
import QandA from "../data";

function Quiz() {
  const [data, setData] = React.useState(QandA);
  const [quizs, setQuizs] = React.useState();
  const [playAgain, setPlayAgain] = React.useState(1);
  const [isSelectedAllAnswers, setIsSelectedAllAnswers] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [score, setScore] = React.useState(0);

  // React.useEffect(() => {
  //   fetch(
  //     "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data.results);
  //       setLoading(false);
  //     });
  // }, [playAgain]);

  React.useEffect(() => {
    setQuizs(
      data?.map((item) => {
        const answerArray = [...item.incorrect_answers, item.correct_answer];
        const allAnswers = answerArray.sort(() => Math.random() - 0.5);
        const correctAnswer = item.correct_answer;
        return {
          id: nanoid(),
          question: item.question,
          answers: allAnswers,
          correctAnswer: correctAnswer,
          checkedAnswer: "",
          checked: false,
        };
      })
    );
  }, [data]);

  function checkAnswer(id, selectedAns) {
    setQuizs((prevQuiz) =>
      prevQuiz.map((quiz) => {
        if (quiz.id === id) {
          return { ...quiz, checkedAnswer: selectedAns, checked: true };
        } else {
          return quiz;
        }
      })
    );
  }

  function checkAllAnswers() {
    if (isSelectedAllAnswers) {
      setIsSelectedAllAnswers(false);
      setLoading(true);

      setPlayAgain((prev) => prev + 1);
    } else {
      setIsSelectedAllAnswers(() => quizs.every((quiz) => quiz.checked));
      setScore(
        quizs.filter((quiz) => quiz.checkedAnswer === quiz.correctAnswer).length
      );
    }
  }

  const questionsEl = quizs?.map((item) => (
    <Questions
      key={item.id}
      id={item.id}
      questions={item.question}
      answers={item.answers}
      correctAnswer={item.correctAnswer}
      checkAnswer={checkAnswer}
      isSelectedAllAnswers={isSelectedAllAnswers}
      checkedAnswer={item.checkedAnswer}
    />
  ));

  return (
    <>
      {loading ? (
        <h1>
          Loading <span>....</span>
        </h1>
      ) : (
        <div className="con">
          <Link to="/">⬅ Back to Home</Link>
          <div className="quiz-con">{questionsEl}</div>
          <div className="check-btn-con flex">
            {isSelectedAllAnswers && (
              <p>{`You are correct ${score} out of 5`} </p>
            )}
            <button onClick={checkAllAnswers} className="check-btn">
              {isSelectedAllAnswers ? "Play again" : "Cheack answers"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Quiz;
