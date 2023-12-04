import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import PlayerDetails from "./PlayerDetails";
import Side from "../Sidemenu";
import ground from "../../images/Field.png";
import EditableTeamName from "../RosterDetails/EditableTeamName";

const FormationPreview = () => {
  const location = useLocation();
  const { player } = location.state || {};
  const [teamName, setTeamName] = useState("My Team");
  const handleNameChange = (newName) => {
    setTeamName(newName);
  };

  const handleSave = () => {
    console.log("Team name saved:", teamName);
  };

  return (
    <div className="main_layout">
      <Side />

      <div className="content">
        <div style={{paddingTop:"22px"}}>
        <EditableTeamName 
          teamName={teamName}
          onNameChange={handleNameChange}
          onSave={handleSave}
        />
       
        </div>
        <div className="formation_view">
          <div className="img-overview">
            <img src={ground} alt="" />
          </div>
          <div className="formation-overview">
            {player ? (
              <>
                <PlayerDetails player={player} />
              </>
            ) : (
              <p>No player details available88.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationPreview;
