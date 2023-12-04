import React, { useState } from "react";
import Papa from "papaparse";
import Modal from "react-modal";

const RosterImporter = ({ onImport, roster, buttonName, importBtnClass }) => {
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [importSummary, setImportSummary] = useState(null);
  const [importSummary2, setImportSummary2] = useState(null);
  const [fileName, setFileName] = useState("No File Selected");
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileName(selectedFile ? selectedFile.name : "No File Selected");
    setFile(selectedFile);
    setImportSummary(null); // Reset importSummary when a new file is selected
  
    if (selectedFile) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        try {
          const csvData = event.target.result;
  
          Papa.parse(csvData, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
              if (results.errors.length > 0) {
                console.error("CSV parsing error:", results.errors);
                setImportSummary({
                  error:
                    "Error parsing CSV file. Please check the file format.",
                });
                return;
              }
  
              // Check for empty cells
              const hasEmptyCells = results.data.some((player) =>
                Object.values(player).some(
                  (value) => value === null || value === ""
                )
              );
  
              if (hasEmptyCells) {
                setImportSummary({
                  error:
                    "Your sheet is missing data. Please ensure all cells are filled out.",
                });
                return;
              }
  
              const rosterWithIds = results.data.map((player, index) => ({
                ...player,
                id: index + 1,
              }));
  
              const positionsCount = {
                Total: rosterWithIds.length,
              };
  
              rosterWithIds.forEach((player) => {
                const position = player.Position || "Unknown";
  
                // Increment the count based on the position
                positionsCount[position] = (positionsCount[position] || 0) + 1;
              });
  
              setImportSummary((prevSummary) => ({
                ...prevSummary,
                positionsCount,
              }));
              setImportSummary2(results.data);
            },
          });
        } catch (error) {
          console.error("Error parsing CSV:", error.message);
          setImportSummary({ error: "Error parsing CSV file." });
        }
      };
  
      reader.readAsText(selectedFile);
    }
  };
  
  const handleAccept = () => {
    onImport(importSummary2);
    setFile(null);
    setImportSummary(null);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className={importBtnClass}>
        {buttonName}
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Import Roster Modal"
      >
        <div className="importer-header">
          <h2>Import Roster</h2>

          <button onClick={closeModal}>x</button>
        </div>
        <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />
      
        {!importSummary && (
          <>
            <div className="csv-txt">File must be in .csv format</div>
          </>
        )}

        {importSummary && importSummary.error && (
          <>
          <span className="error-txt">Error</span>
          <p className="error-file">{importSummary.error}</p>
          </>
        )}
        {importSummary && !importSummary.error && (
          <div className="file-summary-info">
            <h3>File Summary</h3>
            <ul>
              {Object.entries(importSummary.positionsCount).map(
                ([position, count]) => (
                  <li key={position}>
                    <span className="sum-position">{position} </span><span className="sum-count">{count}</span>
                  </li>
                )
              )}
            </ul>
            <button onClick={handleAccept} className="import-modal-btn">Import</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RosterImporter;
