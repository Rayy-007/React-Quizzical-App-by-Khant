import React from "react";
import { Link } from "react-router-dom";
import Questions from "./Questions";
import { nanoid } from "nanoid";

function Quiz() {
  const [data, setData] = React.useState(); // set the data from API
  const [quizs, setQuizs] = React.useState(); // Set data that I want from data
  const [playAgain, setPlayAgain] = React.useState(1); // set the number for  fetching API again
  const [isSelectedAllAnswers, setIsSelectedAllAnswers] = React.useState(false); // Fro checking the selected answer by the use
  const [loading, setLoading] = React.useState(true); // forl loading
  const [score, setScore] = React.useState(0); // for setting the Score or mark
  const [showMessage, setShowMessage] = React.useState(false); // for showing the error message

  /** Fetching the data  */
  React.useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        setLoading(false);
      });
  }, [playAgain]);

  /** Make the array of obj from data to quizs  */
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

  /** Check User selected answer and set it to true */
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

  /** Check all user selected answer and set the scores */
  function checkAllAnswers() {
    if (isSelectedAllAnswers) {
      // If the user select all answers
      showMessage(false);
      setIsSelectedAllAnswers(false);
      setLoading(true);
      setPlayAgain((prev) => prev + 1);
    } else {
      // If the user " Not " select all answers
      const isAllSelected = quizs.every((quiz) => quiz.checked);
      setIsSelectedAllAnswers(() => isAllSelected);
      setScore(
        quizs.filter((quiz) => quiz.checkedAnswer === quiz.correctAnswer).length
      );
      setShowMessage(!isAllSelected);
    }
  }

  /** For hiding the Show Message ELement after 3 second  */
  // React.useEffect(() => {
  //   let timeId;
  //   if (showMessage) {
  //     // Create the Set Time out
  //     timeId = setTimeout(() => {
  //       setShowMessage(false);
  //     }, 3000);
  //   }
  //   return () => clearTimeout(timeId); // clear the time out (to prevent memory leaks)
  // }, [showMessage]);

  /** Create the quizs */
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
        <div className="loading-spinner">
          <div className="spinner">
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="con">
          <Link to="/">⬅ Back to Home</Link>
          {showMessage && (
            <div className="alert">
              <h4>Please answer all questions</h4>
            </div>
          )}
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
