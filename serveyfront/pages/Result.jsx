import { useEffect, useState } from 'react';

const labels = {
    frendly: [
        '개어색함',
        '어색함',
        '친함',
        '개짱친'
    ],
    like: [
        '개비호',
        '비호',
        '호감',
        'ㄹㅈㄷ호감'
    ],
    appearance: [
        '1등급',
        '2등급',
        '3등급',
        '4등급',
        '5등급',
        '6등급',
        '7등급',
        '8등급',
        '9등급',
    ],
    social: [
        '말안됨 (n)',
        '딸림',
        '보통',
        '좋음',
        '말안됨 (p)'
    ],
    jiral: [
        '너무 쳐사림',
        '조금 사리는 편인듯',
        '보통',
        '나댐',
        '개쳐나댐'
    ]
};

const getResult = (field, average) => {
    if (average == null || !Number.isFinite(average)) {
        return '-';
    }

    const options = labels[field];

    // 반올림한 값으로 평가 결정
    const rounded = Math.max(
        1,
        Math.min(options.length, Math.round(average))
    );

    return `${average.toFixed(2)} / ${options.length} (${options[rounded - 1]})`;
};

const ResultPage = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch('/api/answers/stats')
            .then(res => {
                if (!res.ok) throw new Error('통계 조회 실패');
                return res.json();
            })
            .then(setStats)
            .catch(console.error);
    }, []);

    if (!stats) return <p>통계 불러오는 중...</p>;

    if (stats.count === 0) {
        return <p>아직 응답이 없습니다.</p>;
    }

    return (
        <main>
            <h1>정병 해결 일지 - 결과</h1>

            <p>총 응답자: {stats.count}명</p>

            <p>친밀도: {getResult('frendly', stats.frendly)}</p>
            <p>호감도: {getResult('like', stats.like)}</p>
            <p>외모: {getResult('appearance', stats.appearance)}</p>
            <p>사회성: {getResult('social', stats.social)}</p>
            <p>나대는 정도: {getResult('jiral', stats.jiral)}</p>
        </main>
    );
};

export default ResultPage