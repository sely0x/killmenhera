import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div>
            <p>이 페이지는 졸업 후 내가 좀 더 나은 사람이 될 수 있도록, 현재 나의 꼬라지를 알아보기 위해 만들었어. 10가지 아주 간단한 문항에 대답해주면 돼.</p>
        
            <h3>적으러가기</h3>
            <Link to="/w">설문 시작</Link>
        </div>
    )
}

export default HomePage