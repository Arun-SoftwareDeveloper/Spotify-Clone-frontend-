import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/SideBarContainer.css";

const Sidebar = ({ nowPlaying, likedSongs }) => {
  return (
    <div className="sidebar">
      <NavLink to="/" exact activeClassName="active">
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
          <div className="song-info">
            <img src={nowPlaying.imagePath} alt={nowPlaying.title} />
            <p>{nowPlaying.title}</p>
          </div>
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

export default Sidebar;
