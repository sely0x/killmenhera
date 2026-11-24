import { Route, Routes } from 'react-router-dom';
import WritePage from '../pages/WrtiePage';
import ResultPage from '../pages/Result';
import SuspPage from '../pages/susp';
import SusmPage from '../pages/susm';
import Home from '../pages/Home'
import { useState, useEffect } from 'react';
import preloadImages from './preloadImages';

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const images = [];

    for (let i = 1; i <= 10; i++) {
        images.push(`/stars/${i}.png`);
    }

    preloadImages(images).then(() => {
        if (!cancelled) setLoading(false);
    });

    return () => {
        cancelled = true;
    };
  }, []);
  return loading ? (
    <div className="loading-screen">
        Loading...
    </div>
  ) : (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/w" element={<WritePage />} />
          <Route path="/r" element={<ResultPage />} />
          <Route path="/sp" element={<SuspPage />}/>
          <Route path="/sm" element={<SusmPage />}/>
      </Routes>
  );
}

export default App
