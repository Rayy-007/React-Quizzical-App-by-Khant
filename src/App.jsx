import React from "react";
import IntroApp from "./components/IntroApp";
import Quiz from "./components/Quiz";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntroApp />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
