import React from "react";
import Navbar from "./navbar";
import { Routes, Route } from 'react-router-dom'
import Home from "./Home";
import Playlist from "./Playlist";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/playlist" element={<Playlist />} />
      </Routes>
    </>
  );
}

export default App;
