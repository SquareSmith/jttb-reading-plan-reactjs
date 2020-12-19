import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import useWindowSize from "./use-window-size";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

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
      <a
        className="bible-link"
        href="https://www.bible.com/bible/59/JHN.1"
        target="_blank"
      >
        John 1
      </a>
      <a
        className="bible-link"
        href="https://www.bible.com/bible/59/JHN.2"
        target="_blank"
      >
        John 2
      </a>
      <a
        className="bible-link"
        href="https://www.bible.com/bible/59/JHN.3"
        target="_blank"
      >
        John 3
      </a>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
