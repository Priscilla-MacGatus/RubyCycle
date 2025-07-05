import React, { useState, useEffect } from "react";
import RubySettings from "./Components/RubySettings/RubySettings.jsx";
import RubyCalendar from "./Components/RubyCalendar/RubyCalendar";
import RubyPhaseCircle from "./Components/RubyPhaseCircle/RubyPhaseCircle.jsx";
import RubyStores from "./Components/RubyStores.js";
import "./App.css";

const App = () => {
  const [showSettingsForm, setShowSettingsForm] = useState(false);
  const [rubySettings, setRubySettings] = useState(
    () => RubyStores.getSettings() || {}
  );
  const [view, setView] = useState("start");

  useEffect(() => {
    const savedSettings = RubyStores.getSettings();
    if (savedSettings) {
      setRubySettings(savedSettings);
    }
  }, []);

  const handleLogPeriodClick = () => {
    setShowSettingsForm(true);
  };

  const handleSaveSettings = (settings) => {
    setRubySettings(settings);
    RubyStores.saveSettings(settings);
    setShowSettingsForm(false);
    setView("calendar");
  };

  const handleDone = () => {
    setView("phase");
  };

  const handleRestart = () => {
    setView("start");
    setRubySettings({});
  };

  return (
    <div className="app">
      {showSettingsForm ? (
        <RubySettings onSave={handleSaveSettings} />
      ) : view === "start" ? (
        <div>
          <h1 className="title">RubyCycle App</h1>
          <p className="cherryblossom "> 🌸</p>
          <p className="description">
            RubyCycle is a menstrual cycle tracking app that allows users to log
            their periods, visualize cycle phases, and predict upcoming dates
            with an intuitive calendar and circular phase tracker.
          </p>
          <p className="author">Made By Priscilla Mac-Gatus</p>
          <button onClick={handleLogPeriodClick}>Log Period</button>
        </div>
      ) : view === "calendar" ? (
        <div>
          {rubySettings && rubySettings.lastPeriod && (
            <>
              <RubyCalendar settings={rubySettings} />
              <button className="doneButt" onClick={handleDone}>
                Done
              </button>
            </>
          )}
        </div>
      ) : (
        <div>
          <h1 className="title">RubyCycle App</h1>

          {rubySettings && rubySettings.lastPeriod && (
            <>
              <RubyPhaseCircle settings={rubySettings} />
              <button onClick={handleLogPeriodClick}>Log Period</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
