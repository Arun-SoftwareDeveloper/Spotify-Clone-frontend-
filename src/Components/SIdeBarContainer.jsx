// Sidebar.js

import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/SIdeBarContainer.css";

const SIdeBarContainer = ({ nowPlaying, likedSongs }) => {
  return (
    <div className="sidebar">
      <NavLink to="/" exact={true.toString()} activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/now-playing" activeClassName="active">
        Now Playing
      </NavLink>
      <NavLink to="/liked-songs" activeClassName="active">
        Liked Songs
      </NavLink>

      {nowPlaying && (
        <div className="sidebar-now-playing">
          <h4>Now Playing:</h4>
          <img
            src={nowPlaying.imagePath}
            alt={nowPlaying.title}
            style={{ width: "100px", height: "100px" }}
          />
          <p>{nowPlaying.title}</p>
        </div>
      )}

      {likedSongs.length > 0 && (
        <div className="sidebar-liked-songs">
          <h4>Liked Songs:</h4>
          <p>{likedSongs.length}</p>
        </div>
      )}
    </div>
  );
};

export default SIdeBarContainer;
