
import { useState } from "react"
import { Link } from "react-router-dom"

import './home.css'

const script = ["하이", "이게 뭐냐면", "익명으로 받는 설문조사야", "내가 다른 사람한테 어떻게 보이는지 궁금해서 만들어봤거든", "이걸 적고있는 너가 누군지 난 절대 알 수가 없으니까 진짜완전솔직하게 대답해줬으면 해 (애초에 이름쓰는 칸이 없음)", "나ㅏ 이거 진짜진짜 개힘들게 40시간 넘게 걸려서 만들었거든", "구글폼 쓰면 되지 않냐고?", "재미가 없잖아", "아무튼 개힘들었으니까 감탄하면서 봐주도록해", "농담이고 아무튼 여기까지 읽어줘서 고맙다", "설문 끝나면 나오는 문장 나한테 디엠으로 보내면 선물 줄게", "愛してるよ~"]

const HomePage = () => {
    const [count, setCount] = useState(0)

    const isFirst = count === 0
    const isLast = count === script.length - 1

    return (
        <div className="homeroot">
            <p key={count} className="script" lang={isLast ? "ja" : "ko"}>{script[count]}</p>

            <div className="btnbox">
                <button
                    id="prev"
                    className={isFirst ? "hidden primary-btn" : "primary-btn"}
                    onClick={() => setCount(c => Math.max(0, c - 1))}
                >
                    이전
                </button>

                <button
                    id="next"
                    className={isLast ? "hidden primary-btn" : "primary-btn"}
                    onClick={() => setCount(c => Math.min(script.length - 1, c + 1))}
                >
                    다음
                </button>

                <Link
                    to="/w"
                    id="start"
                    className={isLast ? "" : "hidden"}
                >
                    <button className="special">설문 시작하기!</button>
                </Link>
            </div>
        </div>
    )
}

export default HomePage
