import React from "react";
import Navbar from "./navbar";
import { Routes, Route } from 'react-router-dom'
import Home from "./Home";
import SocketProvider from "./providers/SocketProvider";


function App() {
  return (
    <>
      <SocketProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </SocketProvider>
    </>
  );
}

export default App;
