import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../UserContext";
import "../profile.css"

const TherapistPage = ({ baseUrl }) => {
    const user = useContext(UserContext);
    const [error, setError] = useState("")
    const [schedule, setSchedule] = useState({
        sunday: { startTime: "", endTime: "" },
        monday: { startTime: "", endTime: "" },
        tuesday: { startTime: "", endTime: "" },
        wednesday: { startTime: "", endTime: "" },
        thursday: { startTime: "", endTime: "" },
        friday: { startTime: "", endTime: "" },
        saturday: { startTime: "", endTime: "" }
    });

    const turnUserIntoTherapist = () => {
        const userId = document.getElementById("userId").value;
        if (userId) {
            fetch(baseUrl + "/create_therapist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userId,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.message);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const [day, timeType] = name.split(".");
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            [day]: {
                ...prevSchedule[day],
                [timeType]: value
            }
        }));
        console.log(schedule)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedSchedule = {
                sunday: {
                    startTime: schedule.sunday.startTime,
                    endTime: schedule.sunday.endTime,
                },
                monday: {
                    startTime: schedule.monday.startTime,
                    endTime: schedule.monday.endTime,
                },
                tuesday: {
                    startTime: schedule.tuesday.startTime,
                    endTime: schedule.tuesday.endTime,
                },
                wednesday: {
                    startTime: schedule.wednesday.startTime,
                    endTime: schedule.wednesday.endTime,
                },
                thursday: {
                    startTime: schedule.thursday.startTime,
                    endTime: schedule.thursday.endTime,
                },
                friday: {
                    startTime: schedule.friday.startTime,
                    endTime: schedule.friday.endTime,
                },
                saturday: {startTime: schedule.saturday.startTime,
                    endTime: schedule.saturday.endTime,
                },
            };
            console.log(updatedSchedule);
            // console.log(user.user_id);

            const response = await fetch(baseUrl + "/update_schedule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user.user_id,
                    updatedSchedule: updatedSchedule
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.error;
                setError(errorMessage)
                throw new Error(errorMessage);
            }

            setSchedule({
                sunday: { startTime: "", endTime: "" },
                monday: { startTime: "", endTime: "" },
                tuesday: { startTime: "", endTime: "" },
                wednesday: { startTime: "", endTime: "" },
                thursday: { startTime: "", endTime: "" },
                friday: { startTime: "", endTime: "" },
                saturday: { startTime: "", endTime: "" }
            });
            setError("")
        } catch (error) {
            console.error("Error saving schedule:", error);
        }
    };

    const renderTimeOptions = () => {
        return Array.from({ length: 8 }, (_, i) => {
            const hour = 12 + i; // Start from 12 PM
            const formattedHour = hour === 12 ? 12 : hour % 12; // Convert 12 to 12 PM instead of 0 PM
            const period = hour < 12 ? "AM" : "PM";
            return (
                <React.Fragment key={`${formattedHour}:00 ${period}`}>
                    <option value={`${formattedHour}:00 ${period}`}>
                        {`${formattedHour}:00 ${period}`}
                    </option>
                    <option value={`${formattedHour}:30 ${period}`}>
                        {`${formattedHour}:30 ${period}`}
                    </option>
                </React.Fragment>
            );
        });
    };

    return (
        <div>
            <h1>Update Schedule</h1>
            <form onSubmit={handleSubmit} className="schedule-form">
                <div className="grid-container">
                    <div className="grid-row">
                        <div className="grid-cell">
                            <div className="label">Sunday</div>
                        </div>
                        <div className="grid-cell">
                            <div className="label">Monday</div>
                        </div>
                        <div className="grid-cell">
                            <div className="label">Tuesday</div>
                        </div>
                        <div className="grid-cell">
                            <div className="label">Wednesday</div>
                        </div>
                        <div className="grid-cell">
                            <div className="label">Thursday</div>
                        </div>
                        <div className="grid-cell">
                            <div className="label">Friday</div>
                        </div>
                        <div className="grid-cell">
                            <div className="label">Saturday</div>
                        </div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-cell">
                            <div className="label">Start:</div>
                            <Form.Control
                                as="select"
                                className="time-select"
                                name="sunday.startTime"
                                value={schedule.sunday.startTime}
                                onChange={handleChange}
                            >
                                <option value="">Start time</option>
                                {renderTimeOptions()}
                            </Form.Control>
                        </div>
                        <div className="grid-cell">
                            <div className="label">Start:</div>
                            <Form.Control
                                as="select"
                                className="time-select"
                                name="monday.startTime"
                                value={schedule.monday.startTime}
                                onChange={handleChange}
                            >
                                <option value="">Start time</option>
                                {renderTimeOptions()}
                            </Form.Control>
                        </div>
                        <div className="grid-cell">
                            <div className="label">Start:</div>
                            <Form.Control
                                as="select"
                                className="time-select"
                                name="tuesday.startTime"
                                value={schedule.tuesday.startTime}
                                onChange={handleChange}
                            >
                                <option value="">Start time</option>
                                {renderTimeOptions()}
                            </Form.Control>
                        </div>
                        <div className="grid-cell">
                            <div className="label">Start:</div>
                            <Form.Control
                                as="select"
                                className="time-select"
                                name="wednesday.startTime"
                                value={schedule.wednesday.startTime}
                                onChange={handleChange}
                            >
                                <option value="">Start time</option>
                                {renderTimeOptions()}
                            </Form.Control>
                        </div>
                        <div className="grid-cell">
                            <div className="label">Start:</div>
                            <Form.Control
                                as="select"
                                className="time-select"
                                name="thursday.startTime"
                                value={schedule.thursday.startTime}
                                onChange={handleChange}
                            >
                                <option value="">Start time</option>
                                {renderTimeOptions()}
                            </Form.Control>
                        </div>
                        <div className="grid-cell">
                            <div className="label">Start:</div>
                            <Form.Control
                                as="select"
                                className="time-select"
                                name="friday.startTime"
                                value={schedule.friday.startTime}
                                onChange={handleChange}
                            >
                                <option value="">Start time</option>
                                {renderTimeOptions()}
                            </Form.Control>
                        </div>
                        <div className="grid-cell">
                            <div className="label">Start:</div>
                            <Form.Control
                                as="select"
                                className="time-select"
                                name="saturday.startTime"
                                value={schedule.saturday.startTime}
                                onChange={handleChange}
                            >
                                <option value="">Start time</option>
                                {renderTimeOptions()}
                            </Form.Control>
                        </div>
                    </div>


                    <div className="grid-row">
                        <div className="grid-cell">
                            <div className="label">End:</div>
                            <Form.Control
                                as="select"
                                className="time-select"
                                name="sunday.endTime"
                                value={schedule.sunday.endTime}
                                onChange={handleChange}
                            >
                                <option value="">End time</option>
                                {renderTimeOptions()}
                            </Form.Control>
                        </div>
                        <div className="grid-cell">
                            <div className="label">End:</div>
                            <Form.Control
                                as="select"
                                className="time-select"
                                name="monday.endTime"
                                value={schedule.monday.endTime}
                                onChange={handleChange}
                            >
                                <option value="">End time</option>
                                {renderTimeOptions()}
                            </Form.Control>
                        </div>
                        <div className="grid-cell">
                            <div className="label">End:</div>
                            <Form.Control
                                as="select"
                                className="time-select"
                                name="tuesday.endTime"
                                value={schedule.tuesday.endTime}
                                onChange={handleChange}
                            >
                                <option value="">End time</option>
                                {renderTimeOptions()}
                            </Form.Control>
                        </div>
                        <div className="grid-cell">
                            <div className="label">End:</div>
                            <Form.Control
                                as="select"
                                className="time-select"
                                name="wednesday.endTime"
                                value={schedule.wednesday.endTime}
                                onChange={handleChange}
                            >
                                <option value="">End time</option>
                                {renderTimeOptions()}
                            </Form.Control>
                        </div>
                        <div className="grid-cell">
                            <div className="label">End:</div>
                            <Form.Control
                                as="select"
                                className="time-select"
                                name="thursday.endTime"
                                value={schedule.thursday.endTime}
                                onChange={handleChange}
                            >
                                <option value="">End time</option>
                                {renderTimeOptions()}
                            </Form.Control>
                        </div>
                        <div className="grid-cell">
                            <div className="label">End:</div>
                            <Form.Control
                                as="select"
                                className="time-select"
                                name="friday.endTime"
                                value={schedule.friday.endTime}
                                onChange={handleChange}
                            >
                                <option value="">End time</option>
                                {renderTimeOptions()}
                            </Form.Control>
                        </div>
                        <div className="grid-cell">
                            <div className="label">End:</div>
                            <Form.Control
                                as="select"
                                className="time-select"
                                name="saturday.endTime"
                                value={schedule.saturday.endTime}
                                onChange={handleChange}
                            >
                                <option value="">End time</option>
                                {renderTimeOptions()}
                            </Form.Control>
                        </div>
                    </div>
                </div>

                <Button type="submit" className="submit-button">
                    Save
                </Button>
            </form>
            <div>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br />
                <label htmlFor="userId">User ID:</label>
                <input type="text" id="userId" />
                <button onClick={turnUserIntoTherapist}>Turn User into Therapist</button>
            </div>
        </div>
    );
};

export default TherapistPage;
