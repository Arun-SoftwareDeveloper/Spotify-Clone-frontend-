import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button, Col, Card, ProgressBar } from "react-bootstrap";
import "../Styles/ArtistSongs.css"; // Import the CSS file for styling
import backendApi from "../../BackendApi/backendApi";

const ArtistSongs = () => {
  const { artistName } = useParams();
  const [artistSongs, setArtistSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const fetchArtistSongs = async () => {
      try {
        const response = await fetch(`${backendApi}/${artistName}`);
        const data = await response.json();
        setArtistSongs(data);
      } catch (error) {
        console.log(`Internal Server Error ${error}`);
      }
    };

    fetchArtistSongs();
  }, [artistName]);

  useEffect(() => {
    if (audio) {
      audio.onended = () => {
        handleNext();
      };
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      };
    }
  }, [audio]);

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

  return (
    <div>
      <h2>{artistName} Songs</h2>
      <div className="song-grid">
        {artistSongs.map((song, index) => (
          <Col key={index} xs={12} md={4} className="mb-4">
            <Card className="song-card">
              <Card.Img src={song.imagePath} alt={song.title} />
              <Card.Body>
                <Card.Title>{song.title}</Card.Title>
                <Button
                  onClick={() => {
                    playAudio(song.filePath, index);
                    setShowModal(true);
                  }}
                  className="play-pause-button"
                  variant="success"
                >
                  {isPlaying && currentIndex === index ? "Pause" : "Play"}
                </Button>
                {currentIndex === index && (
                  <div>
                    <Button onClick={handlePrevious} variant="outline-dark">
                      <i className="fas fa-backward"></i>
                    </Button>
                    <Button onClick={handleNext} variant="outline-dark">
                      <i className="fas fa-forward"></i>
                    </Button>
                    <ProgressBar
                      now={(currentTime / duration) * 100}
                      label={`${Math.floor((currentTime / duration) * 100)}%`}
                      className="mt-2"
                    />
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
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
};

export default ArtistSongs;
