// src/components/SongUpload.js
import React, { useState } from "react";
import axios from "axios";

const SongUpload = () => {
  const [songFile, setSongFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const handleSongFileChange = (e) => setSongFile(e.target.files[0]);
  const handleImageFileChange = (e) => setImageFile(e.target.files[0]);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleArtistChange = (e) => setArtist(e.target.value);

  const handleUpload = async () => {
    const songFormData = new FormData();
    songFormData.append("song", songFile);

    const imageFormData = new FormData();
    imageFormData.append("image", imageFile);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      // Upload song
      const songResponse = await axios.post(
        "http://localhost:4000/songs/addNewSongs",
        songFormData,
        config
      );

      // Upload image
      const imageResponse = await axios.post(
        "http://localhost:4000/songs/uploadImage",
        imageFormData,
        config
      );

      // Handle success, e.g., show a success message or redirect
    } catch (error) {
      console.error("Error uploading song:", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      Songs
      <br />
      <input type="file" onChange={handleSongFileChange} />
      <br />
      Image<br></br>
      <input type="file" onChange={handleImageFileChange} />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={handleArtistChange}
      />
      <button onClick={handleUpload}>Upload Song</button>
    </div>
  );
};

export default SongUpload;
