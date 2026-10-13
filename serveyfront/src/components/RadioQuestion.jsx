const RadioQuestion = ({ question, value, onChange }) => {
  return (
    <fieldset className="question">
      <legend>{question.title}</legend>

      <div className="options">
        {question.options.map((option, index) => (
          <label className="option" key={index}>
            <input
              type="radio"
              name={question.id}
              value={index + 1}
              checked={value === index + 1}
              onChange={() => onChange(question.id, index + 1)}
            />

            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default RadioQuestion;