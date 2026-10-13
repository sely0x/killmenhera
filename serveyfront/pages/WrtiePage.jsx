import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RadioQuestion from '../src/components/RadioQuestion.jsx';
import { questions } from '../src/data/questions.js';
import './Write.css'

const WritePage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});

  const updateAnswer = (key, value) => {
    setAnswers(prev => ({
      ...prev,
      [key]: value,
    }));
  }

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
    navigate('/r')
  }

  return (
    <main>
      <h1>정병 해결 일지 - 아직 디자인 안 했으니까 밤티라고 욕하지마라</h1>

      <p>
        이 페이지는 졸업 후 내가 좀 더 나은 사람이 될 수 있도록,
        현재 나의 꼬라지를 알아보기 위해 만들었어.
        10가지 아주 간단한 문항에 대답해주면 돼.
      </p>

      <form onSubmit={handleSubmit}>

        {questions.slice(0, 5).map(question => (
          <RadioQuestion
            key={question.id}
            question={question}
            value={answers[question.id]}
            onChange={updateAnswer}
          />
        ))}

        <p>내가 고쳐야 할 가장 큰 문제</p>
        <textarea
          value={answers.problem ?? ''}
          onChange={e => updateAnswer('problem', e.target.value)}
        />

        <hr />

        <p>나에게 해주고 싶은 말</p>
        <textarea
          value={answers.message ?? ''}
          onChange={e => updateAnswer('message', e.target.value)}
        />

        <RadioQuestion
          question={questions[5]}
          value={answers.idea}
          onChange={updateAnswer}
        />

        <button type="submit">끗</button>
      </form>
    </main>
  );
}

export default WritePage;