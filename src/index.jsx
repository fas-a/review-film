import React from "react";
import ReactDOM from "react-dom/client";

import LandingPage from "./LandingPage";
import SearchPage from "./SearchPage";
import reportWebVitals from "./reportWebVitals";
import DetailFilm from "./DetailFilm";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import CmsCountries from "./CmsCountries";
import CmsGenres from "./CmsGenres";
import CmsAwards from "./CmsAwards";
import CmsUsers from "./CmsUsers";
import CmsComments from "./CmsComments";
import CmsActors from "./CmsActors";
import CmsDramas from "./CmsDramas";
import CmsDramaInput from "./CmsDramaInput";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./components/tailwind.output.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/detail" element={<DetailFilm />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cmscountries" element={<CmsCountries />} />
        <Route path="/cmsgenres" element={<CmsGenres />} />
        <Route path="/cmsawards" element={<CmsAwards />} />
        <Route path="/cmsusers" element={<CmsUsers />} />
        <Route path="/cmscomments" element={<CmsComments />} />
        <Route path="/cmsactors" element={<CmsActors />} />
        <Route path="/cmsdramas" element={<CmsDramas />} />
        <Route path="/cmsdramainput" element={<CmsDramaInput />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
