import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";
import { FixedSizeList as List } from "react-window";
import useWindowSize from "./use-window-size";
import readingsJSON from "./jttb";

import "./styles.css";

const rowHeight = 35;

const readingsAll = readingsJSON.map((reading) => {
  return {
    date: reading.d,
    text: reading.t,
    url: reading.u
  };
});

const App = () => {
  const size = useWindowSize();

  const readingsForDate = (date) => {
    const dateKey = format(date, "MMdd");
    return readingsAll.filter((reading) => reading.date === dateKey);
  };

  const [date, setDate] = useState(new Date());
  const [readings, setReadings] = useState(readingsForDate(date));

  const setReadingsByDate = (date) => {
    setDate(date);
    setReadings(readingsForDate(date));
  };

  const Row = ({ index, style }) => (
    <div className="ListItem" style={style}>
      <a
        className="bible-link"
        href={readings[index].url}
        rel="noreferrer"
        target="_blank"
      >
        {readings[index].text}
      </a>
    </div>
  );

  const CustomInput = ({ value, onClick }) => (
    <button className="custom-input" onClick={onClick}>
      {value}
    </button>
  );

  useEffect(() => {
    document.title = "JTTB Daily Reading";
  });

  return (
    <div className="container" width={size.width} height={size.height}>
      <DatePicker
        selected={date}
        onChange={(date) => setReadingsByDate(date)}
        dateFormat="MMMM d"
        todayButton="Today"
        customInput={<CustomInput />}
        withPortal
      />
      <List
        className="List"
        height={readings.length * rowHeight}
        itemCount={readings.length}
        itemSize={rowHeight}
        width={300}
      >
        {Row}
      </List>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
