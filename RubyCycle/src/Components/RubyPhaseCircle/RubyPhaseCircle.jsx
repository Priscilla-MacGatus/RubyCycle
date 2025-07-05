import React from "react";
import { differenceInCalendarDays, parseISO } from "date-fns";
import "./RubyPhaseCircle.css";

const RubyPhaseCircle = ({ settings }) => {
  const getPhaseInfo = () => {
    const { lastPeriod, cycleLength, periodDuration } = settings;
    const lastPeriodDate = parseISO(lastPeriod);
    const today = new Date();
    const daysSinceLastPeriod = differenceInCalendarDays(today, lastPeriodDate);

    const fertileStart = periodDuration;
    const fertileEnd = cycleLength - 14 - 1;
    const ovulationDay = cycleLength - 14;
    const nextPeriodStart = cycleLength;

    if (daysSinceLastPeriod < fertileStart) {
      return {
        current: "Menstruation",
        next: "Fertile Window",
        daysLeft: fertileStart - daysSinceLastPeriod,
        risk: "Low",
      };
    } else if (daysSinceLastPeriod <= fertileEnd) {
      return {
        current: "Fertile Window",
        next: "Ovulation",
        daysLeft: ovulationDay - daysSinceLastPeriod,
        risk: "Moderate",
      };
    } else if (daysSinceLastPeriod === ovulationDay) {
      return {
        current: "Ovulation",
        next: "Luteal Phase",
        daysLeft: nextPeriodStart - daysSinceLastPeriod,
        risk: "High",
      };
    } else if (daysSinceLastPeriod < nextPeriodStart) {
      return {
        current: "Luteal Phase",
        next: "Menstruation",
        daysLeft: nextPeriodStart - daysSinceLastPeriod,
        risk: "Low",
      };
    } else {
      return {
        current: "New Cycle",
        next: "Menstruation",
        daysLeft: 0,
        risk: "Low",
      };
    }
  };

  const { current, next, daysLeft, risk } = getPhaseInfo();

  return (
    <div>
      <h3>Current Phase: {current}</h3>
      <div className="phase-circle">
        <span className="emoji">🩸🌸</span>
        <p>
          {daysLeft > 0 ? `${daysLeft} day(s) to ${next}` : "Cycle restarting"}
        </p>
        <p>
          Pregnancy Risk: <strong>{risk}</strong>
        </p>
      </div>
    </div>
  );
};

export default RubyPhaseCircle;
