import "./App.css";
import { data } from "../../data";
import { useEffect, useState } from "react";
import Ticket from "../Ticket/Ticket";
function App() {
  const [tickets, setTickets] = useState(
    data.sort((a, b) => a.price - b.price)
  );
  const [fill, setFill] = useState({
    all: true,
    zero: false,
    one: false,
    two: false,
    three: false,
  });
  useEffect(() => {
    if (fill.zero && fill.one && fill.two && fill.three && !fill.all) {
      setFill({ ...fill, all: true });
    }
    if ((!fill.zero || !fill.one || !fill.two || !fill.three) && fill.all) {
      setFill({ ...fill, all: false });
    }
    let arr = data.filter((el) => {
      if (fill.all) {
        return true;
      }
      if (fill.zero && el.stops === 0) {
        return true;
      }
      if (fill.one && el.stops === 1) {
        return true;
      }

      if (fill.two && el.stops === 2) {
        return true;
      }
      if (fill.three && el.stops === 3) {
        return true;
      }
      return false;
    });
    console.log(arr);
    setTickets(arr);
  }, [fill]);

  const [val, setVal] = useState("Р");
  console.log(fill);
  return (
    <div className="App">
      <div className="filter_box">
        <div className="valute">
          <div>ВАЛЮТА</div>
          <ul className="val_select">
            <li
              onClick={() => {
                setVal("₽");
              }}
              className={val === "₽" ? "active" : ""}
            >
              RUB
            </li>
            <li
              onClick={() => {
                setVal("$");
              }}
              className={val === "$" ? "active" : ""}
            >
              USD
            </li>
            <li
              onClick={() => {
                setVal("€");
              }}
              className={val === "€" ? "active" : ""}
            >
              EUR
            </li>
          </ul>
        </div>
        <div className="fillter">
          <div>Количество пересадок</div>
          <label htmlFor="">
            <input
              type="checkbox"
              checked={fill.all}
              onChange={(e) => {
                if (e.target.checked) {
                  setFill({
                    all: true,
                    zero: true,
                    one: true,
                    two: true,
                    three: true,
                  });
                } else {
                  setFill({
                    all: false,
                    zero: false,
                    one: false,
                    two: false,
                    three: false,
                  });
                }
              }}
            />{" "}
            Все
          </label>
          <label htmlFor="">
            <input
              type="checkbox"
              checked={fill.zero}
              onChange={(e) => {
                setFill({ ...fill, zero: e.target.checked });
              }}
            />{" "}
            Без пересадок
          </label>
          <label htmlFor="">
            <input
              checked={fill.one}
              type="checkbox"
              onChange={(e) => {
                setFill({ ...fill, one: e.target.checked });
              }}
            />{" "}
            1 пересадка
          </label>
          <label htmlFor="">
            <input
              type="checkbox"
              checked={fill.two}
              onChange={(e) => {
                setFill({ ...fill, two: e.target.checked });
              }}
            />{" "}
            2 пересадки
          </label>
          <label htmlFor="">
            <input
              checked={fill.three}
              type="checkbox"
              onChange={(e) => {
                setFill({ ...fill, three: e.target.checked });
              }}
            />{" "}
            3 пересадки
          </label>
        </div>
      </div>
      <div className="tickets">
        {tickets.map((tick, i) => (
          <Ticket tick={tick} key={i} val={val} />
        ))}
      </div>
    </div>
  );
}

export default App;
