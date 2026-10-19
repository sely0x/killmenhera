
const RadioQuestion = ({ question, value, onChange, stars }) => {
  return (
    <fieldset className="question">
      <legend className="sr-only">{question.title}</legend>
      <p>{question.title}</p>

      <div className="options">
        {question.options.map((option, index) => {
          const optionValue = index + 1;
          const star = stars[`${question.id}:${optionValue}`];

          return (
            <label className="option" key={index}>
              <input
                type="radio"
                name={question.id}
                value={optionValue}
                checked={value === optionValue}
                onChange={() => onChange(question.id, optionValue)}
                style={
                  star
                    ? { '--star': `url('./stars/${star}')` }
                    : {}
                }
              />

              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default RadioQuestion;
