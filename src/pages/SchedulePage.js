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
import { loadStripe } from "@stripe/stripe-js";

const locales = { "en-US": require("date-fns/locale/en-US"), };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const SchedulePage = ({ baseUrl }) => {
    // Values for formatting Scheduler and Time Picker
    const minTime = new Date();
    minTime.setHours(12, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(21, 0, 0);
    // For calendar
    const timeFormat = (date, culture, localizer) =>
        format(date, "h a", { locale: localizer.locale });

    const user = useContext(UserContext);
    const [error, setError] = useState("")
    const [therapists, setTherapists] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedTherapistName, setSelectedTherapistName] = useState("");
    const [selectedTherapistId, setSelectedTherapistId] = useState(0);
    const [newEvent, setNewEvent] = useState({
        therapist: "",
        service: "",
        duration: 60,
        start: new Date(),
        time: "12:00 PM",
        end: new Date(),
    });
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [today, setToday] = useState(new Date());

    useEffect(() => {setToday(new Date())}, [])

    const filterDate = (date) => {
        if (date < today)
            return false
        const dateString = format(date, "yyyy-MM-dd");
        if (unavailableDates.includes(dateString))
            return false
        return true; // Enables the date
    };

    useEffect(() => {
        const timeParts = newEvent.time.split(/:|\s/);
        const selectedTime = new Date(newEvent.start);
        selectedTime.setHours(
            Number(timeParts[0]) + (timeParts[2] === "PM" && timeParts[0] !== "12" ? 12 : 0),
            Number(timeParts[1]),
            0
        );
        const durationInMinutes = Number(newEvent.duration);
        const end = addMinutes(selectedTime, durationInMinutes);
        setNewEvent({ ...newEvent, start: selectedTime, end: end });
    }, [newEvent.duration, newEvent.time]);

    useEffect(() => {
        fetchAppointments();
    }, []);
    const fetchAppointments = async () => {
        try {
            const response = await fetch(baseUrl + "/all_appointments");
            if (!response.ok) {
                throw new Error("Failed to fetch appointments");
            }
            const data = await response.json();
            setAppointments(data);
            // Extract the unavailable dates from the fetched appointments
            // const unavailableDates = data.map((appointment) => {
            //     console.log("Appointment start:", appointment.start);
            //     return format(new Date(appointment.start), "yyyy-MM-dd")
            // });
            setUnavailableDates(unavailableDates);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

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
    }, [selectedTherapistName]);
    const fetchServices = async () => {
        if (selectedTherapistName) {
            try {
                const response = await fetch(
                    baseUrl + `/therapist_services/${selectedTherapistName}`
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

    const [allEvents, setAllEvents] = useState(appointments);

    useEffect(() => {
        const updatedEvents = appointments.map((appointment) => {
            const startTime = new Date(appointment.start);
            const duration = appointment.duration;
            const endTime = new Date(startTime.getTime() + duration * 60000); // Convert minutes to milliseconds
            return {
                ...appointment,
                start: startTime,
                end: endTime,
                title: `${appointment.title}`,
            };
        });

        setAllEvents(updatedEvents);
    }, [appointments]);

    const handleAddEvent = async (e) => {
        e.preventDefault();
        try {
            const formattedStart = newEvent.start.toISOString();
            const appointmentDate = formattedStart.split('T')[0];
            const updatedEvent = {
                user_id: user.user_id,
                therapist_id: selectedTherapistId,
                service: newEvent.service,
                duration: newEvent.duration,
                time: newEvent.time,
                start: appointmentDate,
            };
            console.log("updated event")
            console.log(updatedEvent)

            const r = await fetch(baseUrl + "/check_schedule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedEvent)
            });
            if (!r.ok) {
                const errorData = await r.json();
                const errorMessage = errorData.error;
                setError(errorMessage)
                throw new Error(errorMessage);
            }

            // $$$$$$$$$$$$$ Payment API $$$$$$$$$$$$
            const stripePromise = loadStripe("pk_test_Tf1S5BkuE7m8m8LfpcfX82LN");
            if (updatedEvent.duration === 60) {
                const response = await fetch(baseUrl + "/tx60", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"  // Add this line to set the Content-Type header
                    }
                })
                if (!response.ok) {
                    const errorData = await response.json();
                    const errorMessage = errorData.message;
                    setError(errorMessage);
                    throw new Error(errorMessage);
                }
                const responseData = await response.json();
                const sessionId = responseData.session_id;
                // Redirect to Stripe Checkout
                const stripe = await stripePromise;
                const { error } = await stripe.redirectToCheckout({
                    sessionId: sessionId,
                });
                if (error) {
                    setError(error.message);
                    throw new Error(error.message);
                }
            }
            else if (updatedEvent.duration === 90) {
                const response = await fetch(baseUrl + "/tx90");
                if (!response.ok) {
                    const errorData = await response.json();
                    const errorMessage = errorData.message;
                    setError(errorMessage);
                    throw new Error(errorMessage);
                }
                const responseData = await response.json();
                const sessionId = responseData.session_id;
                // Redirect to Stripe Checkout
                const stripe = await stripePromise;
                const { error } = await stripe.redirectToCheckout({
                    sessionId: sessionId,
                });
                if (error) {
                    setError(error.message);
                    throw new Error(error.message);
                }
            }

            // Make the API request to create a new appointment
            const resp = await fetch(baseUrl + "/create_appointment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedEvent)
            });
            if (!resp.ok) {
                const errorData = await resp.json();
                const errorMessage = errorData.error;
                setError(errorMessage)
                throw new Error(errorMessage);
            }

            const newEventWithDates = {
                ...updatedEvent,
                start: newEvent.start,
                end: newEvent.end,
                title: `${selectedTherapistName} - ${newEvent.service} - ${newEvent.duration}`
            };
            setAllEvents([...allEvents, newEventWithDates]);
            setNewEvent({
                therapist: "",
                service: "",
                duration: 60,
                start: new Date(),
                time: "12:00 PM",
                end: new Date(),
            });
            setError("")
        } catch (error) {
            console.error("Error saving event:", error);
        }
    }


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
                                setNewEvent({ ...newEvent, therapist: e.target.value });
                                const therapist = therapists.find(
                                    (therapist) => therapist.name === e.target.value
                                );
                                setSelectedTherapistName(e.target.value);
                                setSelectedTherapistId(therapist ? therapist.therapist_id : "");
                            }}
                        >
                            <option value="">Select a therapist</option>
                            {therapists.map((therapist, therapist_id) => (
                                <option key={therapist.therapist_id} value={therapist.name}>
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
                                selected={newEvent.start}
                                onChange={(start) => setNewEvent({ ...newEvent, start })}
                                filterDate={filterDate}
                            />
                        </div>
                        <div className="time-select-wrapper">
                            <Form.Control
                                as="select"
                                id="time-selector"
                                className="time-select"
                                value={newEvent.time}
                                onChange={(e) => {
                                    const selectedTime = e.target.value;
                                    const [hours, minutes] = selectedTime.split(/:|\s/);
                                    const selectedDate = new Date(newEvent.start);
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
                    <p className="error">{error ? error : ""}</p>
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
            <script src="https://js.stripe.com/v3/"></script>
        </div>
    );
};

export default SchedulePage;
