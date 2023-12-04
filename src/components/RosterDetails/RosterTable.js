import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";

import RosterImporter from "./RosterImporter";
import SearchField from "./SearchField";
import editicon from "../../images/edit-action-icon.svg";
import deleteicon from "../../images/delete-action-icon.svg";
import { NavLink } from "react-router-dom";
import FormationOverview from "../FormationOverview/FormationPreview";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DeleteConfirmationPopup = ({ onDelete, onCancel, player }) => {
  return (
    <Modal
      className="delete-modal"
      isOpen={true} // Set to true to make the modal open
      contentLabel="Delete Confirmation Modal"
    >
      <div className="popup">
        <div className="del-header">
          <span className="sure-txt"> Are you sure ? </span>
          <span className="cross_del">
            <button onClick={onCancel}>x</button>
          </span>

          {/* {player && player.name ? player.name : "this player"}? */}
        </div>
        <div className="action-txt">This action cannot be undone.</div>
        <div className="button-container">
          <button onClick={onCancel} className="canc_btn">
            Cancel
          </button>
          <button onClick={onDelete} className="dele_btn">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

const EditPopup = ({ player, onEdit, onCancel }) => {
  const [editedPlayer, setEditedPlayer] = useState({ ...player });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  };

  const renderInputFields = () => {
    const desiredFields = [
      "Player Name",
      "Jersey Number",
      "Height",
      "Weight",
      "Nationality",
      "Position",
      "Starter",
    ];

    return desiredFields.map((key) => (
      <div className="edit_field" key={key}>
        {key === "Position" ? (
          <div className="text_label_box">
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>

            <select
              name={key}
              value={editedPlayer[key]}
              onChange={handleInputChange}
            >
              <option value="Forward">Forward</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Defender">Defender</option>
              <option value="Goalkeeper">Goalkeeper</option>
            </select>
          </div>
        ) : key === "Starter" ? (
          <div className="radio_label_box">
            <span className="radio-lb">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
            <label>
              <input
                type="radio"
                name={key}
                value="Yes"
                checked={editedPlayer[key] === "Yes"}
                onChange={handleInputChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name={key}
                value="No"
                checked={editedPlayer[key] === "No"}
                onChange={handleInputChange}
              />
              No
            </label>
          </div>
        ) : (
          <div className="text_label_box">
            <label>{key.charAt(0).toUpperCase() + key.slice(1)} </label>

            <input
              type="text"
              name={key}
              value={editedPlayer[key]}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>
    ));
  };

  return (
    <Modal
      isOpen={true}
      contentLabel="Edit Confirmation Modal"
      className="edit_player"
    >
      <div className="popup">
        <div className="edit-header">
          <span className="sure-txt">Edit Player </span>
          <span className="cross_del">
            <button onClick={onCancel}>x</button>
          </span>

          {/* {player && player.name ? player.name : "this player"}? */}
        </div>
        <div className="edit_player_form">{renderInputFields()}</div>
        <div className="button-container">
          <button
            onClick={() => onEdit(editedPlayer)}
            className="edit-play-btn"
          >
            Edit Player
          </button>
        </div>
      </div>
    </Modal>
  );
};

const RosterTable = () => {
  const [roster, setRoster] = useState([]);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRoster, setFilteredRoster] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Define isModalOpen state

  const handleImport = (rosterData, importedRoster) => {
    // Add unique IDs to each player
    const rosterWithIds = rosterData.map((player) => ({
      ...player,
      id: uuidv4(),
    }));

    setRoster(rosterWithIds);
    setIsModalOpen(false); // Close the modal
    console.log("Roster after import:", rosterWithIds);
    handleSearch(""); // Clear the search term
  };

  const handleDelete = () => {
    if (selectedPlayer) {
      console.log("Selected Player ID:", selectedPlayer.id);
      setRoster((prevRoster) =>
        prevRoster.filter((player) => {
          console.log("Player ID in Roster:", player.id);
          return player.id !== selectedPlayer.id;
        })
      );
      setShowDeletePopup(false);
      setSelectedPlayer(null); // Reset selected player after deletion
    }
  };

  const handleEdit = (editedPlayer) => {
    console.log(`Edit player with ID ${editedPlayer.id}`, editedPlayer);
    setRoster((prevRoster) =>
      prevRoster.map((player) =>
        player.id === editedPlayer.id ? editedPlayer : player
      )
    );
    setShowEditPopup(false);
  };

  const showDeleteConfirmation = (playerId) => {
    const playerToDelete = roster.find((player) => player.id === playerId);

    if (playerToDelete) {
      setShowDeletePopup(true);
      setSelectedPlayer(playerToDelete);
    } else {
      console.error(`Player with ID ${playerId} not found in roster.`);
    }
  };

  const showEditPopupForPlayer = (player) => {
    setShowEditPopup(true);
    setSelectedPlayer(player);
  };

  useEffect(() => {
    console.log(searchTerm, "searschhhhh44477");
    // Add your logic to filter and show the row based on searchTerm if needed
  }, [searchTerm]);
  const handleSearch = (value) => {
    setSearchTerm(value);
    console.log(searchTerm, "searschhhhh444");
  };

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = roster.filter((player) =>
      Object.values(player).some(
        (value) =>
          value && value.toString().toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
    setFilteredRoster(filtered);
  }, [roster, searchTerm]);

  // Get the navigate function
  const navigate = useNavigate();

  const handlePlayerClick = (player) => {
    console.log("clicking to navigateeeeeeeeeee", player);
    setSelectedPlayer(player);

    // Navigate to the desired path
    navigate("/formation-overview", { state: { player } });
  };
  return (
    <div>
      <div className="table-up-sec">
        <div className="table-row-search">
          <SearchField
            value={searchTerm}
            onChange={(value) => handleSearch(value)}
            onSearch={() => {}}
            onCancel={() => setSearchTerm("")}
          />
          {roster.length > 0 ? (
            <RosterImporter
              onImport={handleImport}
              roster={roster}
              buttonName="Re-Import Team"
              importBtnClass="re-import-team-btn"
            />
          ) : (
            <RosterImporter
              onImport={handleImport}
              roster={roster}
              buttonName="Import Team"
              importBtnClass="import-team-btn"
            />
          )}
        </div>

        <table className="team-table">
          <thead>
            <tr>
              <th className="first-table">Player Name</th>
              <th>Jersey Number</th>
              <th>Starter</th>
              <th>Position</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Nationality</th>
              <th>Appearances</th>
              <th>Minutes Played</th>
              <th></th>
            </tr>
          </thead>
          {roster.length > 0 ? (
            <tbody>
              {filteredRoster.map((row, index) => (
                <tr key={index}>
                  <td onClick={() => handlePlayerClick(row)}>
                    {row["Flag Image"] && (
                      <img
                        src={row["Flag Image"]}
                        alt={`Flag ${index}`}
                        style={{
                          maxWidth: "24px",
                          maxHeight: "16px",
                          marginRight: "8px",
                        }}
                      />
                    )}
                    <span className="link_player">{row["Player Name"]}</span>
                  </td>
                  <td>{row["Jersey Number"]}</td>
                  <td>{row["Starter"]}</td>
                  <td>{row["Position"]}</td>
                  <td>{row["Height"]} m</td>
                  <td>{row["Weight"]} kg</td>
                  <td>{row["Nationality"]}</td>
                  <td>{row["Appearances"]}</td>
                  <td>{row["Minutes Played"]}</td>
                  <td></td>
                  <td>
                    <div className="button-container">
                      <button onClick={() => showEditPopupForPlayer(row)}>
                        <img src={editicon} alt="" />
                      </button>
                      <button onClick={() => showDeleteConfirmation(row.id)}>
                        <img src={deleteicon} alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <div className="no-players">
              <div>
                <p>You do not have any players on the roster</p>
                <RosterImporter
                  onImport={handleImport}
                  roster={roster}
                  buttonName="Import Team"
                  importBtnClass="import-team-btn"
                />
              </div>
            </div>
          )}
        </table>

        {showDeletePopup && (
          <DeleteConfirmationPopup
            onDelete={handleDelete}
            onCancel={() => setShowDeletePopup(false)}
            player={selectedPlayer}
          />
        )}

        {showEditPopup && (
          <EditPopup
            player={selectedPlayer}
            onEdit={handleEdit}
            onCancel={() => setShowEditPopup(false)}
          />
        )}
      </div>
    </div>
  );
};

export default RosterTable;
