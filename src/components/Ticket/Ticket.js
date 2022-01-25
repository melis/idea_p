import { format } from "date-fns";
import { ru } from "date-fns/locale";
import React from "react";

function Ticket({ tick, val }) {
  //   console.log(tick);
  return (
    <div className="ticket">
      <div className="ticket_left">
        <center>{tick.carrier} Airlines</center>
        <button>
          Купить за{" "}
          {val === "₽"
            ? tick.price
            : val === "$"
            ? Math.round(tick.price / 79)
            : Math.round(tick.price / 90)}
          {val}
        </button>
      </div>
      <div className="ticket_right">
        <div className="ticket_arrow">
          {tick.stops > 0 && tick.stops} ПЕРЕСАДК
          {tick.stops === 0 ? "И НЕТ" : tick.stops === 1 ? "А" : "И"}
        </div>
        <div className="ticket_origin">
          <div className="ticket_time">{tick.departure_time}</div>
          <div className="ticket_info">
            {tick.origin}, {tick.origin_name}
          </div>

          <div>
            {format(new Date(tick.departure_date), "dd MMM yyyy,' 'EEEEEE", {
              locale: ru,
            })}
          </div>
        </div>
        <div className="ticket_arrival">
          <div className="ticket_time">{tick.arrival_time}</div>
          <div className="ticket_info">
            {tick.destination_name}, {tick.destination}
          </div>
          <div>
            {format(new Date(tick.arrival_date), "dd MMM yyyy' 'eeeeee", {
              locale: ru,
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
