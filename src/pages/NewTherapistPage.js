import React, { useState } from "react";
import httpClient from "../httpClient";
import { useNavigate } from "react-router-dom";


const NewTherapistPage = ({ baseUrl }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    
    const navigate = useNavigate();

    const createTherapist = async () => {
        try {
            const response = await httpClient.post(baseUrl + "/create_therapist", { email });
            console.log(response.data); // Handle the response as needed
            navigate("/"); // Navigate back to the index ('/')
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError("An error occurred. Please try again later.");
            }
        }
    };


    return (
        <div>
            <h1>Create a New Therapist</h1>
            <form>
                <div>
                    <label>Email: </label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="button" onClick={() => createTherapist()}>
                    Submit
                </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default NewTherapistPage;
