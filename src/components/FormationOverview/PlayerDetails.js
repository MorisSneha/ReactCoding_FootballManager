import React from "react";
import "../../App.css";
const PlayerDetails = ({ player }) => {
  // Check if the player object is defined
  if (!player) {
    return <p>No player details available.</p>;
  }

  return (
    <div className="player_details_card">
      <h2>{player.name}</h2>
      <img className="img-player" src={player["Player Image"]} />
      <h2>{player["Player Name"]}</h2>
      <h4 className="position">{player["Position"]}</h4>
      <div className="row-one">
        <span className="player_info">
          <span className="play_label">Height</span>
          <span className="play_data">{player["Height"]} m</span>
        </span>
        <span className="player_info">
          <span className="play_label">Weight</span>
          <span className="play_data">{player["Weight"]} kg</span>
        </span>
        <span className="player_info">
          <span className="play_label">Nationality</span>
          <span className="play_data">
            <img
              src={player["Flag Image"]}
              style={{
                maxWidth: "24px",
                maxHeight: "16px",
                marginRight: "8px",
              }}
            />
            {player["Nationality"]}
          </span>
        </span>
      </div>
      <div className="row-two">
        <div className="play_info">
          <span className="data_play">{player["Appearances"]}</span>
          <span className="info_play">Apperances</span>
        </div>
        <div className="play_info">
          <span className="data_play">{player["Minutes Played"]}</span>
          <span className="info_play">Minutes Played</span>
        </div>
      
      </div>
      <div className="row-three">
        <div className="play_info">
          <span className="data_play">{player["Clean Sheets"]}</span>
          <span className="info_play">Clean Sheets</span>
        </div>
        <div className="play_info">
          <span className="data_play">{player["Saves"]}</span>
          <span className="info_play">Saves</span>
        </div>
      
      </div>
  
      {/* {player.position === "Goalkeeper" ? (
        <div>
          <p>Clean Sheets: {player.cleanSheets}</p>
          <p>Saves: {player.saves}</p>
        </div>
      ) : (
        <div>
          <p>Goals: {player.goals}</p>
          <p>Assists: {player.assists}</p>
        </div>
      )}
      <p>Appearances: {player.appearances}</p>
      <p>Minutes Played: {player.minutesPlayed}</p> */}
    </div>
  );
};

export default PlayerDetails;
