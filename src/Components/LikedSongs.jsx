import React from "react";
import { Card, Row, Col } from "react-bootstrap";

function LikedSongs({ likedSongs }) {
  return (
    <div className="liked-songs-container">
      <h2>Liked Songs:</h2>
      <Row xs={1} md={2} lg={3}>
        {likedSongs.map((likedSong) => (
          <Col key={likedSong._id} className="mb-4">
            <Card className="liked-song-card">
              <Card.Img src={likedSong.imagePath} alt={likedSong.title} />
              <Card.Body>
                <Card.Title>{likedSong.title}</Card.Title>
                <Card.Text>Artist: {likedSong.artist}</Card.Text>
                <Card.Text>Genre: {likedSong.genre}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default LikedSongs;
