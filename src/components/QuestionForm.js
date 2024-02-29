import React, { useState } from 'react';

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: '',
    answers: ['', '', '', ''],
    correctIndex: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith('answer')) {
      const index = parseInt(name.slice(-1)) - 1; 
      setFormData({
        ...formData,
        answers: formData.answers.map((ans, i) => (i === index ? value : ans)),
      });
    } else if (name === 'correctIndex') {
      setFormData({
        ...formData,
        [name]: parseInt(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newQuestion = {
      prompt: formData.prompt,
      answers: formData.answers,
      correctIndex: parseInt(formData.correctIndex) + 1, // Add 1 to match the correct indexing
    };
    onAddQuestion(newQuestion);
    setFormData({
      prompt: '',
      answers: ['', '', '', ''],
      correctIndex: 0,
    });
  };

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        {[1, 2, 3, 4].map((num) => (
          <label key={num}>
            Answer {num}:
            <input
              type="text"
              name={`answer${num}`}
              value={formData.answers[num - 1]} // Index is zero-based
              onChange={handleChange}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {[0, 1, 2, 3].map((index) => (
              <option key={index} value={index}>{index + 1}</option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
