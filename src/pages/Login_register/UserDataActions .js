import "bootstrap/dist/css/bootstrap.min.css";
import { saveAs } from "file-saver";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const LOCAL_STORAGE_KEY = "userFormEntries";

function UserDataActions() {
  const [formEntries, setFormEntries] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setFormEntries(saved);
  }, []);

  const handleDownloadExcel = () => {
    if (formEntries.length === 0) {
      alert("No data to download!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(formEntries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Form Data");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });

    // File name with today's date
    const today = new Date();
    const filename = `form_data_${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}.xlsx`;

    saveAs(data, filename);
  };

  const handleClearData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setFormEntries([]);
  };

  return (
    <div>
      <h2 style={{textAlign:'center'}}>Saved Entries</h2>
      {formEntries.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <table className="table table-striped table-bordered mt-4">
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>Name</th>
              <th>Password</th>
              <th>Phone</th>
              <th>Address</th>
              <th>State</th>
              <th>Dist</th>
              <th>Tal</th>
              {/* <th>Timestamp</th> */}
            </tr>
          </thead>
          <tbody>
            {formEntries.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td> {/* Added numbering */}
                <td>{entry.username}</td>
                <td>{entry.password}</td>
                <td>{entry.phone}</td>
                <td>{entry.address}</td>
                <td>{entry.state}</td>
                <td>{entry.dist}</td>
                <td>{entry.tal}</td>
                {/* <td>{entry.timestamp}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button class="btn btn-outline-primary" onClick={handleDownloadExcel} disabled={formEntries.length === 0}>
        Download Excel
      </button>
      <button class="btn btn-outline-danger" onClick={handleClearData} disabled={formEntries.length === 0}>
        Clear All Data
      </button>
    </div>
  );
}

export default UserDataActions;
