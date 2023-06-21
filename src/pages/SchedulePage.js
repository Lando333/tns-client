import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "Ryan - Deep Tissue - 90",
        start: new Date('2023-06-21T14:00:00'),
        end: new Date('2023-06-21T15:30:00'),
    },
    {
        title: "Tom - Acupressure - 90",
        start: new Date('2023-06-21T16:00:00'),
        end: new Date('2023-06-21T17:30:00'),
    },
    {
        title: "Stephanie - Swedish - 90",
        start: new Date('2023-06-23T14:00:00'),
        end: new Date('2023-06-23T15:30:00'),
    },
];

const SchedulePage = ({ baseUrl }) => {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    return (
        <div className="schedule">
            <h1>Schedule</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor='start'
                endAccessor='end'
                style={{height: 600, width: 800, margin: '50px'}}
            />
        </div>
    );
};

export default SchedulePage;