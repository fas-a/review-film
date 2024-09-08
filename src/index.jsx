import React from 'react';
import ReactDOM from 'react-dom/client';

import LandingPage from './LandingPage';
import SearchPage from './SearchPage';
import reportWebVitals from './reportWebVitals';
import DetailFilm from './DetailFilm';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './components/tailwind.output.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/detail" element={<DetailFilm />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();