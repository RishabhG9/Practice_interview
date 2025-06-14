// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';

export const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}