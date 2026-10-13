import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div>
            <h3>적으러가기</h3>
            <Link to="/w">설문 시작</Link>
        </div>
    )
}

export default HomePage