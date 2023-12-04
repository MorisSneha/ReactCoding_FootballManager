// EditableTeamName.js

import "../../App.css";
import React, { useState } from "react";
import pen from "../../images/pen.svg"

const EditableTeamName = ({ teamName, onNameChange, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(teamName);

  const handleInputChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleSave = () => {
    onNameChange(editedName);
    onSave();
    setIsEditing(false);
  };

  return (
    <div className="editable-team-name">
      <div className="roaster-txt">
      Roster Details
      </div>
      {isEditing ? (
        <input
          type="text"
          value={editedName}
          onChange={handleInputChange}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <div className="team-name-container">
          <span>{editedName}</span>
          {teamName == "My Team" ? (
            <button className="edit-button-default" onClick={() => setIsEditing(true)}>
              <img src={pen} alt="" />
            </button>
          ) : (
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              <img src={pen} alt="" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableTeamName;
