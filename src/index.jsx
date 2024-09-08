import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import LandingPage from './LandingPage';
import reportWebVitals from './reportWebVitals';
import DetailFilm from './DetailFilm';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './components/tailwind.output.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/detail" element={<DetailFilm />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();