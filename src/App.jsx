import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SongList from "./UploadSongs/SongList";
import RegisterForm from "./Forms/RegisterFom";
import LoginForm from "./Forms/LoginForm";
import { ToastContainer } from "react-bootstrap";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/songsList" element={<SongList />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
