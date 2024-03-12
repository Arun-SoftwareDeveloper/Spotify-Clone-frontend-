// ArtistsList.js
import React, { useState } from "react";
import { Card, Col, Button, Modal } from "react-bootstrap";
import ArtistSongs from "../Components/ArtistSongs";
import "../Styles/ArtistsList.css";
import { Link } from "react-router-dom";
import backendApi from "../../BackendApi/backendApi";

function ArtistsList() {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artistSongs, setArtistSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchSelectedArtistSongs = async (artistName) => {
    try {
      const response = await fetch(`${backendApi}/${artistName}`);
      const data = await response.json();
      setArtistSongs(data);
    } catch (error) {
      console.log(`Internal Server Error ${error}`);
    }
  };

  const handleArtist = (artistName) => {
    setSelectedArtist(artistName);
    fetchSelectedArtistSongs(artistName);
  };

  const playAudio = (songUrl, index) => {
    if (audio && currentIndex === index) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(songUrl);
      setAudio(newAudio);
      setCurrentIndex(index);
      newAudio.play();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (audio) {
      const nextIndex = (currentIndex + 1) % artistSongs.length;
      playAudio(artistSongs[nextIndex].filePath, nextIndex);
    }
  };

  const handlePrevious = () => {
    if (audio) {
      const prevIndex =
        currentIndex === 0 ? artistSongs.length - 1 : currentIndex - 1;
      playAudio(artistSongs[prevIndex].filePath, prevIndex);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const artistImages = {
    Illayaraja:
      "https://qph.cf2.quoracdn.net/main-qimg-c6bec9749f07479502cf86886498f17a-lq",
    SPB: "https://static.toiimg.com/thumb/msid-78321075,width-400,resizemode-4/78321075.jpg",
    Yesudas:
      "https://www.thestatesman.com/wp-content/uploads/2017/08/1492162672-k.jpg",
    "Yuvan Shankar Raja":
      "https://media.tenor.com/tMOt3XNq5PEAAAAe/yuvan-shankar-raja-hd-image.png",
    "Anirudh Ravichander":
      "https://yt3.googleusercontent.com/1G7jVoKBbWklulYJmMVZuMgb3QfVZIPpLmBuLobOpXjXl6BL50-Nc1CPjn5KYcg0uKL7oi6kgw=s900-c-k-c0x00ffffff-no-rj",
  };

  return (
    <div className="container mt-4 artists-container">
      <div className="row">
        {Object.keys(artistImages).map((artist, index) => (
          <Col key={index} xs={6} md={4} lg={3} className="mb-4">
            <Link to={`/artistSongs/${artist}`} className="link-unStyled">
              <div className="artist-container">
                <div className="artist" onClick={() => handleArtist(artist)}>
                  <img src={artistImages[artist]} alt={artist} />
                  <div className="resume-button">
                    <i className="fa fa-play"></i>
                  </div>
                </div>
                <div className="artist-name">{artist}</div>
              </div>
            </Link>
          </Col>
        ))}

        {selectedArtist && (
          <ArtistSongs artistName={selectedArtist} artistSongs={artistSongs} />
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Now Playing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentIndex !== null && (
            <div>
              <h4>Title: {artistSongs[currentIndex].title}</h4>
              <p>Artist: {artistSongs[currentIndex].artist}</p>
              <p>Genre: {artistSongs[currentIndex].genre}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ArtistsList;
