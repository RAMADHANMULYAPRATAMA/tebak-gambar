import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import Level from "./pages/Level";
import Puzzle from "./pages/Puzzle";
import LeaderboardPage from "./pages/Leaderboard";
import OverallLeaderboard from "./pages/OverallLeaderboard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<OverallLeaderboard />} />
        <Route path="/level">
          <Route index element={<Level />} />
          <Route path=":level">
            <Route index element={<Puzzle />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
