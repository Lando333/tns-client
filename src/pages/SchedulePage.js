import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { addMinutes } from "date-fns";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../UserContext";

const locales = {"en-US": require("date-fns/locale/en-US"),};
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
    // Values for formatting Scheduler and Time Picker
    const minTime = new Date();
    minTime.setHours(12, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(21, 0, 0);
    // For calendar
    const timeFormat = (date, culture, localizer) =>
        format(date, "h a", { locale: localizer.locale });
    // For time picker
    // const formatTime = (date) => {
    //     if (!date) {
    //         return ""; // Handle empty case
    //     }
    //     const hours = date.getHours();
    //     const minutes = date.getMinutes();
    //     const period = hours >= 12 ? "PM" : "AM";
    //     const formattedHours = hours % 12 || 12;
    //     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    //     return `${formattedHours}:${formattedMinutes} ${period}`;
    // };


    const user = useContext(UserContext);
    const [allEvents, setAllEvents] = useState(events);
    const [therapists, setTherapists] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedTherapist, setSelectedTherapist] = useState("");
    const [newEvent, setNewEvent] = useState({
        therapist: "",
        service: "",
        duration: 60,
        date: new Date(),
        time: "12:00 PM",
        end: new Date(),
    });    

    useEffect(() => {
        const timeParts = newEvent.time.split(/:|\s/);
        const selectedTime = new Date(newEvent.date);
        selectedTime.setHours(
            Number(timeParts[0]) + (timeParts[2] === "PM" && timeParts[0] !== "12" ? 12 : 0),
            Number(timeParts[1]),
            0
        );
        const durationInMinutes = Number(newEvent.duration);
        const end = addMinutes(selectedTime, durationInMinutes);
        setNewEvent({ ...newEvent, date: selectedTime, end: end });
    }, [newEvent.duration, newEvent.time]);


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

        try {
            const updatedEvent = {
                title: `${newEvent.therapist} - ${newEvent.service} - ${newEvent.duration}`,
                user_id: user.user_id,
                therapist_id: newEvent.therapist,
                service: newEvent.service,
                duration: newEvent.duration,
                time: newEvent.time,
                date: newEvent.date,
                end: newEvent.end,
            };
            console.log(updatedEvent)

            // Make the API request to save the event
            const response = await fetch(baseUrl + "/create_appointment", {
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
                therapist: "",
                service: "",
                duration: 60,
                date: new Date(),
                time: "12:00 PM",
                end: new Date(),
            });
        } catch (error) {
            console.error("Error saving event:", error);
        }
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
                            onChange={(e) => {
                                setNewEvent({ ...newEvent, service: e.target.value })
                            }}
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
                        value={newEvent.duration}
                        onChange={(e) => setNewEvent({ ...newEvent, duration: Number(e.target.value) })}
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
                                selected={newEvent.date}
                                onChange={(date) => setNewEvent({...newEvent, date})}
                            />
                        </div>
                        <div className="time-select-wrapper">
                            <Form.Control
                                as="select"
                                className="time-select"
                                value={newEvent.time}
                                onChange={(e) => {
                                    const selectedTime = e.target.value;
                                    const [hours, minutes] = selectedTime.split(/:|\s/);
                                    const selectedDate = new Date(newEvent.date);
                                    selectedDate.setHours(Number(hours), Number(minutes), 0);
                                    setNewEvent({ ...newEvent, time: selectedTime });
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
