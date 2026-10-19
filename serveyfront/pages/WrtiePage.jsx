
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import RadioQuestion from '../src/components/RadioQuestion.jsx';
import { questions } from '../src/data/questions.js';
import './Write.css';

const weights = {
  '1.png': 5,
  '2.png': 3,
  '3.png': 2,
  '4.png': 3,
  '5.png': 4,
  '6.png': 3,
  '7.png': 2,
  '8.png': 3,
  '9.png': 3,
  '10.png': 3
};

const stars = Object.entries(weights)
  .flatMap(([star, weight]) => Array(weight).fill(star));

const WritePage = () => {
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});
  const [selectedStars, setSelectedStars] = useState({});

  const first = useRef(true);

  const updateAnswer = (key, value) => {
    setAnswers(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateRadio = (key, value) => {
    updateAnswer(key, value);

    const star = first.current
      ? '1.png'
      : stars[Math.floor(Math.random() * stars.length)];

    first.current = false;

    setSelectedStars(prev => ({
      ...prev,
      [`${key}:${value}`]: star
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        throw new Error('제출 실패');
      }

      const result = await response.json();
      console.log(result);

      alert('제출 완료!');
      navigate('/r');

    } catch (error) {
      console.error(error);
      alert('제출에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <main>
      <h1>정병 해결 일지 - 아직 디자인 안 했으니까 밤티라고 욕하지마라</h1>

      <form className="qbox" onSubmit={handleSubmit}>

        {questions.slice(0, 5).map(question => (
          <RadioQuestion
            key={question.id}
            question={question}
            value={answers[question.id]}
            onChange={updateRadio}
            stars={selectedStars}
          />
        ))}

        <fieldset className="question">
          <legend className="sr-only">내가 고쳐야 할 가장 큰 문제</legend>
          <p>내가 고쳐야 할 가장 큰 문제</p>
          <textarea
            placeholder="없으면 없다고써라"
            value={answers.problem ?? ''}
            onChange={e => updateAnswer('problem', e.target.value)}
          />
        </fieldset>

        <fieldset className="question">
          <legend className="sr-only">나에게 해주고 싶은 말</legend>
          <p>나에게 해주고 싶은 말</p>
          <textarea
            placeholder="마찬가지로없으면없다고써"
            value={answers.message ?? ''}
            onChange={e => updateAnswer('message', e.target.value)}
          />
        </fieldset>

        <RadioQuestion
          question={questions[5]}
          value={answers[questions[5].id]}
          onChange={updateRadio}
          stars={selectedStars}
        />

        <button type="submit">끗</button>
      </form>
    </main>
  );
};

export default WritePage;
