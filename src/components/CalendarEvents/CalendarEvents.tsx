import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCalendarEventsReducer } from "../../store/calendarSlice";
import { getCalendarEvents } from "../../store/calendarSlice";
import { RootState } from "../../store";
import "./CalendarEvents.scss";

const CalendarEvents = () => {
  const dispatch = useDispatch();
  const { calendarSlice, authSlice } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (authSlice.isSignedIn) {
      dispatch(getCalendarEvents());
    }
  }, [authSlice]);

  return calendarSlice.calendarEvents.length > 0 ? (
    <section className="calendar-events__container">
      <header>
        <div className="row">
          <div className="col">Summary</div>
          <div className="col">Start Date</div>
          <div className="col">End Date</div>
        </div>
      </header>
      <div className="details">
        {calendarSlice.calendarEvents.map((event, index) => {
          return (
            <div className="row" key={`row-${index}`}>
              <span className="col">{event.summary}</span>
              <span className="col">
                {new Date(event.start.dateTime).toLocaleString()}
              </span>
              <span className="col">
                {new Date(event.end.dateTime).toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  ) : (
    <div>Loading Calendar Events...</div>
  );
};

export default React.memo(CalendarEvents);
