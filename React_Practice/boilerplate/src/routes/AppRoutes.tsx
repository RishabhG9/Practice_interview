import { Sample } from '../pages/Sample/Sample';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { About } from '../pages/About/About';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sample" element={<Sample />} />
    </Routes>
  );
}
