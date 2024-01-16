import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SongList from "./UploadSongs/SongList";
import RegisterForm from "./Forms/RegisterFom";
import LoginForm from "./Forms/LoginForm";
import { ToastContainer } from "react-bootstrap";
import LikedSongs from "./Components/LikedSongs";

function App() {
  // Initialize likedSongs state
  const [likedSongs, setLikedSongs] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/songsList"
            element={<SongList setLikedSongs={setLikedSongs} />}
          />
          <Route
            path="/likedSongs"
            element={<LikedSongs likedSongs={likedSongs} />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
