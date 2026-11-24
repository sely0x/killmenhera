
import './Write.css';
import { useEffect, useState } from 'react';

const SuspPage = () => {
    const [problems, setProblems] = useState(null);

    useEffect(() => {
        fetch('/api/answers/problems')
            .then(res => {
                if (!res.ok) throw new Error('문제점 조회 실패');
                return res.json();
            })
            .then(setProblems)
            .catch(console.error);
    }, []);

    if (!problems) return <p>문제점 불러오는 중...</p>;

    if (problems.length === 0) {
        return <p>아직 응답이 없습니다.</p>;
    }

    return (
        <main>
            <div className="ansholder">
                {problems.map((msg, i) => (
                    <fieldset className="question" key={i}>
                        <legend className="sr-only">
                            응답 #{i + 1}
                        </legend>
                        <p>응답 #{i + 1}</p>
                        <div className="options">{msg}</div>
                    </fieldset>
                ))}
            </div>
        </main>
    );
};

export default SuspPage;
