import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import LandingPage from './LandingPage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './components/tailwind.output.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();