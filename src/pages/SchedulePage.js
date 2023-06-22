import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { setHours, setMinutes } from "date-fns";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../UserContext";

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
        start: new Date("2023-06-21T14:00:00"),
        end: new Date("2023-06-21T15:30:00"),
    },
    {
        title: "Tom - Acupressure - 60",
        start: new Date("2023-06-21T16:00:00"),
        end: new Date("2023-06-21T17:00:00"),
    },
    {
        title: "Stephanie - Swedish - 60",
        start: new Date("2023-06-23T14:00:00"),
        end: new Date("2023-06-23T15:00:00"),
    },
];

const SchedulePage = ({ baseUrl }) => {
    const [newEvent, setNewEvent] = useState({
        title: "",
        start: new Date(),
        startTime: "",
        end: new Date(),
        therapist: "",
        service: "",
    });
    const [allEvents, setAllEvents] = useState([]);
    const [therapists, setTherapists] = useState([]);
    const [selectedTherapist, setSelectedTherapist] = useState("");
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [duration, setDuration] = useState(60);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const minTime = new Date();
    minTime.setHours(12, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(21, 0, 0);
    const timeFormat = (date, culture, localizer) =>
        format(date, "h a", { locale: localizer.locale });

    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${period}`;
    };

    const user = useContext(UserContext);


    useEffect(() => {
        fetchTherapists();
    }, []);

    const fetchTherapists = async () => {
        try {
            const response = await fetch(baseUrl + "/all_therapists");
            if (!response.ok) {
                throw new Error("Failed to fetch therapists");
            }
            const data = await response.json();
            setTherapists(data);
        } catch (error) {
            console.error("Error fetching therapists:", error);
        }
    };


    useEffect(() => {
        fetchServices();
    }, [selectedTherapist]);

    const fetchServices = async () => {
        if (selectedTherapist) {
            try {
                const response = await fetch(
                    baseUrl + `/therapist_services/${selectedTherapist}`
                );
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        } else {
            setServices([]); // Reset selected services when no therapist is selected
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const end = new Date(newEvent.start.getTime() + duration * 60000);
            const updatedEvent = {
                title: `${newEvent.therapist} - ${newEvent.service} - ${duration}`,
                start: newEvent.start,
                end: end,
                user_id: user.user_id // Add the current user's ID to the payload
            };

            // Make the API request to save the event
            const response = await fetch(baseUrl + "/create_event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedEvent)
            });

            if (!response.ok) {
                throw new Error("Failed to save event");
            }

            setAllEvents([...allEvents, updatedEvent]);
            setNewEvent({
                title: "",
                start: new Date(),
                startTime: "",
                end: new Date(),
                therapist: "",
                service: ""
            });
        } catch (error) {
            setError("Failed to save event. Please try again.");
            console.error("Error saving event:", error);
        }

        setLoading(false);
    };


    return (
        <div className="schedule">
            <div className="page-container">
                <h2>Book A Treatment</h2>
                <Form onSubmit={handleAddEvent}>

                    <div className="therapist-service-picker">
                        <Form.Select
                            style={{ width: "132px", marginRight: "12px" }}
                            value={newEvent.therapist}
                            onChange={(e) => {
                                setNewEvent({ ...newEvent, therapist: e.target.value })
                                setSelectedTherapist(e.target.value)
                            }}
                        >
                            <option value="">Select a therapist</option>
                            {therapists.map((therapist, index) => (
                                <option key={index} value={therapist.name}>
                                    {therapist.name}
                                </option>
                            ))}
                        </Form.Select>

                        <Form.Select
                            style={{ width: "132px", marginRight: "12px" }}
                            value={newEvent.service}
                            onChange={(e) => setSelectedService(e.target.value)}
                        >
                            <option value="">Select a service</option>
                            {services.map((service, index) => (
                                <option key={index} value={service}>
                                    {service}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    <label className="form-text">Duration:</label>
                    <Form.Select
                        style={{ width: "90px", marginRight: "10px" }}
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                    >
                        <option value={60}>60 minutes</option>
                        <option value={90}>90 minutes</option>
                    </Form.Select><br /><br />


                    <div className="sched-form-date-time">
                        <div className="date-picker-wrapper">
                            <DatePicker
                                placeholderText="Treatment Date"
                                className="date-picker"
                                style={{ marginRight: "10px" }}
                                selected={newEvent.start}
                                onChange={(start) =>
                                    setNewEvent({
                                        ...newEvent,
                                        start,
                                        end: new Date(
                                            start.getTime() + duration * 60000
                                        ),
                                    })
                                }
                            />
                        </div>
                        <div className="time-select-wrapper">
                            <Form.Control
                                as="select"
                                className="time-select"
                                value={formatTime(newEvent.start)}
                                onChange={(e) => {
                                    const selectedTime = e.target.value;
                                    const [hours, minutes, period] = selectedTime.split(/:|\s/);
                                    const roundedMinutes = minutes >= 30 ? "30" : "00"; // Round minutes to 0 or 30
                                    const hour = period === "PM" ? parseInt(hours, 10) + 12 : parseInt(hours, 10); // Adjust for PM hours
                                    const newStart = setHours(setMinutes(newEvent.start, roundedMinutes), hour);
                                    setNewEvent({ ...newEvent, start: newStart });
                                }}
                            >
                                {Array.from({ length: 8 }, (_, i) => {
                                    const hour = 12 + i; // Start from 12 PM
                                    const formattedHour = hour === 12 ? 12 : hour % 12; // Convert 12 to 12 PM instead of 0 PM
                                    const period = hour < 12 ? "AM" : "PM";
                                    return (
                                        <React.Fragment key={`${formattedHour}:00 ${period}`}>
                                            <option value={`${formattedHour}:00 ${period}`}>{`${formattedHour}:00 ${period}`}</option>
                                            <option value={`${formattedHour}:30 ${period}`}>{`${formattedHour}:30 ${period}`}</option>
                                        </React.Fragment>
                                    );
                                })}
                            </Form.Control>
                        </div>
                    </div>

                    <Button type="submit">Submit</Button>
                </Form>
            </div>
            
            <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600, width: 800, margin: "50px" }}
                min={minTime}
                max={maxTime}
                formats={{ timeGutterFormat: timeFormat }}
            />
        </div>
    );
};

export default SchedulePage;
