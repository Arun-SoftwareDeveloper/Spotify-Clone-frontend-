// SongList.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "../Styles/SongList.css"; // Import your CSS file
import HeaderContainer from "../Components/HeaderContainer";
import SideBarContainer from "../Components/SIdeBarContainer";
import backendApi from "../../BackendApi/backendApi";

const NowPlaying = ({ nowPlaying, handleLikeSong }) => {
  return (
    <div className="now-playing-container">
      <h2>Now Playing:</h2>
      {nowPlaying && (
        <Card>
          <Card.Img src={nowPlaying.imagePath} alt={nowPlaying.title} />
          <Card.Body>
            <Card.Title>{nowPlaying.title}</Card.Title>
            <Card.Text>Artist: {nowPlaying.artist}</Card.Text>
            <Card.Text>Genre: {nowPlaying.genre}</Card.Text>
            <Button onClick={handleLikeSong} variant="primary">
              Like
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

const LikedSongs = ({ likedSongs }) => {
  return (
    <div className="liked-songs-container">
      <h2>Liked Songs:</h2>
      {likedSongs.map((likedSong) => (
        <Card key={likedSong._id}>
          <Card.Img src={likedSong.imagePath} alt={likedSong.title} />
          <Card.Body>
            <Card.Title>{likedSong.title}</Card.Title>
            <Card.Text>Artist: {likedSong.artist}</Card.Text>
            <Card.Text>Genre: {likedSong.genre}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`${backendApi}/songs`);
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error.message);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", handleNext);

      return () => {
        // Clean up the event listener when the component is unmounted or audio changes
        audio.removeEventListener("ended", handleNext);
      };
    }
  }, [audio, currentIndex, songs]);

  const playAudio = (filePath, index) => {
    if (audio) {
      // Pause the currently playing audio
      audio.pause();
      audio.currentTime = 0; // Reset the current time to the beginning
    }

    // If the same song is clicked again, toggle play/pause
    if (selectedSong === filePath) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio
          .play()
          .catch((error) =>
            console.error("Error playing audio:", error.message)
          );
      }
      setIsPlaying(!isPlaying);
      return;
    }

    // Play the selected audio
    const newAudio = new Audio(filePath);
    newAudio
      .play()
      .catch((error) => console.error("Error playing audio:", error.message));
    setAudio(newAudio);
    setSelectedSong(filePath);
    setIsPlaying(true);
    setCurrentIndex(index);
    newAudio.addEventListener("timeupdate", () =>
      setCurrentTime(newAudio.currentTime)
    );
    newAudio.addEventListener("loadedmetadata", () =>
      setDuration(newAudio.duration)
    );
    newAudio.addEventListener("error", (error) => {
      console.error("Audio error:", error.message);
    });

    // Set the currently playing song
    setNowPlaying(songs[index]);

    // Reset hoveredIndex to null when a new song is played
    setHoveredIndex(null);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    playAudio(songs[nextIndex].filePath, nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playAudio(songs[prevIndex].filePath, prevIndex);
  };

  const handleSkipForward = () => {
    if (audio) {
      audio.currentTime += 10; // Skip forward by 10 seconds
    }
  };

  const handleSkipBackward = () => {
    if (audio) {
      audio.currentTime -= 10; // Skip backward by 10 seconds
    }
  };

  const handleSeek = (value) => {
    if (audio) {
      const newPosition = (value / 100) * audio.duration;
      audio.currentTime = newPosition;
    }
  };

  const handleLikeSong = () => {
    // Add the currently playing song to the liked songs list
    if (nowPlaying) {
      setLikedSongs((prevLikedSongs) => [...prevLikedSongs, nowPlaying]);
    }
  };
  return (
    <>
      <HeaderContainer />
      <Container fluid>
        <Row>
          <Col md={3}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <SideBarContainer nowPlaying={nowPlaying} likedSongs={likedSongs} />
          </Col>
          <Col md={9}>
            <br />
            <br /> <br /> <br />
            <br></br>
            <br /> <br />
            <div className="songs-container">
              <Row>
                {songs.map((song, index) => (
                  <Col key={song._id} md={4} className="mb-4">
                    <Card className="song-card">
                      <Card.Img
                        src={song.imagePath}
                        alt={song.title}
                        onClick={() => playAudio(song.filePath, index)}
                        className="song-image"
                      />
                      <Card.Body>
                        <Card.Title>{song.title}</Card.Title>
                        <Card.Text>
                          {isPlaying && currentIndex === index && (
                            <>
                              <p>Artist: {song.artist}</p>
                              <p>Genre: {song.genre}</p>
                            </>
                          )}
                        </Card.Text>
                        {hoveredIndex === index && (
                          <Button
                            onClick={() => playAudio(song.filePath, index)}
                            className="play-pause-button"
                            variant="success"
                          >
                            {isPlaying && currentIndex === index
                              ? "Pause"
                              : "Play"}
                          </Button>
                        )}
                        {isPlaying && currentIndex === index && (
                          <div>
                            <Button
                              onClick={handlePrevious}
                              variant="outline-dark"
                            >
                              <i className="fa-solid fa-chevron-left"></i>
                            </Button>
                            <Button onClick={handleNext} variant="outline-dark">
                              <i className="fa-solid fa-chevron-right"></i>
                            </Button>
                            <br />
                            <input
                              type="range"
                              min="0"
                              max={duration}
                              step="1"
                              value={currentTime}
                              onChange={(e) => handleSeek(e.target.value)}
                            />
                            <br />
                            <Button
                              onClick={handleSkipBackward}
                              variant="outline-dark"
                            >
                              <i className="fa-solid fa-backward"></i>
                            </Button>
                            <Button
                              onClick={handleSkipForward}
                              variant="outline-dark"
                            >
                              <i className="fa-solid fa-forward"></i>
                            </Button>
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SongList;
