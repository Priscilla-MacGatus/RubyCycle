import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./RubyCalendar.css";
import { enUS } from "date-fns/locale";
import { addDays, parseISO, differenceInCalendarDays } from "date-fns";

const RubyCalendar = ({ settings }) => {
  const calculateDates = () => {
    if (
      !settings ||
      !settings.lastPeriod ||
      !settings.cycleLength ||
      !settings.periodDuration
    ) {
      return [];
    }

    const { lastPeriod, cycleLength, periodDuration } = settings;
    const lastPeriodDate = parseISO(lastPeriod);

    const nextPeriodStart = addDays(lastPeriodDate, cycleLength);
    const nextPeriodEnd = addDays(nextPeriodStart, periodDuration - 1);

    const ovulationDay = addDays(lastPeriodDate, cycleLength - 14);
    const fertileStart = addDays(ovulationDay, -5);
    const fertileEnd = ovulationDay;

    const lutealStart = addDays(ovulationDay, 1);
    const lutealEnd = addDays(nextPeriodStart, -1);

    let highlightDates = [];

    for (let d = nextPeriodStart; d <= nextPeriodEnd; d = addDays(d, 1)) {
      highlightDates.push({ date: d, type: "period" });
    }

    for (let d = fertileStart; d <= fertileEnd; d = addDays(d, 1)) {
      highlightDates.push({ date: d, type: "fertile" });
    }

    highlightDates.push({ date: ovulationDay, type: "ovulation" });

    for (let d = lutealStart; d <= lutealEnd; d = addDays(d, 1)) {
      highlightDates.push({ date: d, type: "luteal" });
    }

    return highlightDates;
  };

  const highlightDates = calculateDates();

  return (
    <div>
      <h2>RubyCycle Calendar</h2>
      <Calendar
        locale={enUS}
        tileClassName={({ date }) => {
          const highlight = highlightDates.find(
            (item) => item.date.toDateString() === date.toDateString()
          );
          return highlight ? highlight.type : null;
        }}
      />

      <div className="legend">
        <div className="period">Period</div>
        <div className="ovulation">Ovulation</div>
        <div className="fertile">Fertile Window</div>
        <div className="luteal">Luteal Phase</div>
      </div>
    </div>
  );
};

export default RubyCalendar;
