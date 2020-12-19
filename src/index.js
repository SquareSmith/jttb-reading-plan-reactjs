import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import { FixedSizeList as List } from "react-window";
import format from "date-fns/format";
import useWindowSize from "./use-window-size";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

const rowHeight = 35;

const readingsAll = [
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
  },
  {
    date: "0414",
    text: "1 Samuel 21-24",
    url: "https://www.bible.com/bible/59/1SA.21"
  },
  {
    date: "0415",
    text: "Psalms 7",
    url: "https://www.bible.com/bible/59/PSA.7"
  },
  {
    date: "0415",
    text: "Psalms 27",
    url: "https://www.bible.com/bible/59/PSA.27"
  },
  {
    date: "0415",
    text: "Psalms 31",
    url: "https://www.bible.com/bible/59/PSA.31"
  },
  {
    date: "0415",
    text: "Psalms 34",
    url: "https://www.bible.com/bible/59/PSA.34"
  },
  {
    date: "0415",
    text: "Psalms 52",
    url: "https://www.bible.com/bible/59/PSA.52"
  }
];

const Row = ({ index, style }) => (
  <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
    <a
      className="bible-link"
      href={readingsAll[index].url}
      rel="noreferrer"
      target="_blank"
    >
      {readingsAll[index].text}
    </a>
  </div>
);

const App = () => {
  const size = useWindowSize();
  const [date, setDate] = useState(new Date());

  const dateKey = format(date, "MMdd");
  console.log("Current dateKey is " + dateKey);

  const readings = readingsAll.filter((reading) => reading.date === dateKey);

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
