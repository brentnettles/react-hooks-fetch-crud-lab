import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  const handleDeleteQuestion = (questionId) => {
    // Update the questions list by filtering out the deleted question
    const updatedQuestions = questions.filter((question) => question.id !== questionId);
    // Set the updated questions list using setQuestions
    setQuestions(updatedQuestions);
  };

  return (
    <section>
      <h1>Quiz Questions</h1> 
      <ul>
        {questions.map((question) => (
          <QuestionItem 
            key={question.id} 
            question={question} 
            onDelete={handleDeleteQuestion} 
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
