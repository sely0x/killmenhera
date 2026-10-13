import { Route, Routes } from 'react-router-dom';
import WritePage from '../pages/WrtiePage';
import ResultPage from '../pages/Result';
import Home from '../pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/w' element={<WritePage />}></Route>
      <Route path='/r' element={<ResultPage />}></Route>
    </Routes>
  )
}

export default App
