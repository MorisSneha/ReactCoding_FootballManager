import React, { useState, useEffect } from "react";
import EditableTeamName from "./components/RosterDetails/EditableTeamName";
import SearchField from "./components/RosterDetails/SearchField";
import RosterImporter from "./components/RosterDetails/RosterImporter";
import RosterTable from "./components/RosterDetails/RosterTable";
import FormationPreview from "./components/FormationOverview/FormationPreview";
import PlayerDetails from "./components/FormationOverview/PlayerDetails";
import logo from "../src/images/logo-icon.svg";
import bars from "../src/images/sidebar-bars-icon.png";
import people from "../src/images/sidebar-people-icon.png";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Sidemenu from "./components/Sidemenu";

const Main = () => {
  const [roster, setRoster] = useState([]);
  const [teamName, setTeamName] = useState("My Team");
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleNameChange = (newName) => {
    setTeamName(newName);
  };

  const handleSave = () => {
    console.log("Team name saved:", teamName);
  };
  const handleSearch = (value) => {
    setSearchTerm(value);
    console.log(searchTerm, "searschhhhh");
  };
  return (
    <div>
      <div className="main_layout">
      <Sidemenu/>
        <div className="content">
          <div className="head_section">
            <EditableTeamName
              teamName={teamName}
              onNameChange={handleNameChange}
              onSave={handleSave}
            />
            <div>
              {/* <SearchField
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
              onSearch={handleSearch}
              onCancel={() => setSearchTerm("")}
            /> */}
              {/* <RosterImporter onImport={handleImport} roster={roster}/> */}
            </div>
          </div>
          <RosterTable
            roster={roster}
            handleSearch={(value) => setSearchTerm(value)}
          />
          {/* <FormationPreview roster={roster} /> */}
          {/* <PlayerDetails /> */}
        </div>
      </div>
    </div>
  );
};

export default Main;
