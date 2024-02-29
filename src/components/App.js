import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    fetch("http://localhost:4000/questions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
//POST NEW QUESTION
  const handleAddQuestion = (newQuestionData) => {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestionData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add question");
        }
        return response.json();
      })
      .then((data) => {
        // Update question list with the newly added question
        setQuestions([...questions, data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} questions/>
      ) : (
        <QuestionList questions={questions} setQuestions={setQuestions}/>
      )}
    </main>
  );
}

export default App;
