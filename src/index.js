import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import { FixedSizeList as List } from "react-window";
import useWindowSize from "./use-window-size";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

const rowHeight = 35;

const readings = [
  {
    date: "0413",
    text: "1 Samuel 18-20",
    url: "https://www.bible.com/bible/59/1SA.18"
  },
  {
    date: "0413",
    text: "Psalms 11",
    url: "https://www.bible.com/bible/59/PSA.11"
  },
  {
    date: "0413",
    text: "Psalms 59",
    url: "https://www.bible.com/bible/59/PSA.59"
  }
];

const Row = ({ index, style }) => (
  <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
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

const App = () => {
  const size = useWindowSize();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    document.title = "JTTB Daily Reading";
  });

  const CustomInput = ({ value, onClick }) => (
    <button className="custom-input" onClick={onClick}>
      {value}
    </button>
  );
  return (
    <div className="container" width={size.width} height={size.height}>
      {size.width}px / {size.height}px
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
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
