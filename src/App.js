import React, { useState, useEffect } from "react";
import FormationPreview from "./components/FormationOverview/FormationPreview";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Main from "./Main";

const App = () => {
  const [roster, setRoster] = useState([]);
  const [teamName, setTeamName] = useState("My Team");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Define isModalOpen state

  const handleImport = (rosterData, importedRoster) => {
    // console.log("Imported Roster Data:", rosterData);
    // setRoster(rosterData);
    // setIsModalOpen(false); // Close the modal
    // console.log("Roster after import:", importedRoster);

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
    // Additional save logic if needed
    console.log("Team name saved:", teamName);
  };
  const handleSearch = (value) => {
    setSearchTerm(value);
    console.log(searchTerm, "searschhhhh");
  };
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/formation-overview" element={<FormationPreview />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
