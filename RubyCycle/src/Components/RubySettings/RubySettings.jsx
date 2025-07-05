import React, { useState } from "react";
import "./RubySettings.css"; 

const RubySettings = ({ onSave }) => {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [periodDuration, setPeriodDuration] = useState(5);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "lastPeriod") setLastPeriod(value);
    else if (name === "cycleLength") setCycleLength(value);
    else if (name === "periodDuration") setPeriodDuration(value);
  };

  const handleSave = () => {
    if (!lastPeriod) {
      alert("Please select your last period date.");
      return;
    }
    if (!cycleLength || cycleLength <= 0) {
      alert("Please enter a valid cycle length.");
      return;
    }
    if (!periodDuration || periodDuration <= 0) {
      alert("Please enter a valid period duration.");
      return;
    }

    const settings = {
      lastPeriod,
      cycleLength: Number(cycleLength),
      periodDuration: Number(periodDuration),
    };
    onSave(settings);
  };

  return (
    <div className="settings-form">
      <h2>Set Your Cycle Info</h2>
      <label>
        Last Period Date:
        <input
          type="date"
          name="lastPeriod"
          value={lastPeriod}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Cycle Length (days):
        <input
          type="number"
          name="cycleLength"
          value={cycleLength}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Period Duration (days):
        <input
          type="number"
          name="periodDuration"
          value={periodDuration}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default RubySettings;
