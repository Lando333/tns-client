import React, { useState } from "react"
import httpClient from "../httpClient"
import "../register.css"

const RegisterPage = ({ baseUrl }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [address_line1, setAddressLineOne] = useState("")
    const [address_line2, setAddressLineTwo] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip_code, setZipCode] = useState("")
    const [error, setError] = useState("")


    const registerUser = async (e) => {
        e.preventDefault();
        console.log(typeof (email))
        console.log(typeof (password))
        console.log(typeof (first_name))
        console.log(typeof (last_name))
        console.log(typeof (address_line1))
        console.log(typeof (address_line2))
        console.log(typeof (city))
        console.log(typeof (state))
        console.log(typeof (zip_code))
        console.log(error)
        try {
            const resp = await httpClient.post(baseUrl + "/register", {
                email,
                password,
                first_name,
                last_name,
                address_line1,
                address_line2,
                city,
                state,
                zip_code,
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            console.log(resp)
            // window.location.href = "/";
            if (!resp.ok) {
                const errorData = await resp.json();
                const errorMessage = errorData.error;
                setError(errorMessage)
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.log("ERROR")
            if (error.response && error.response.status === 401) {
                setError(error);
            }
        }
    };

    return (
        <div>
            <h1>Create an account</h1>
            <p>{error ? error : ""}</p>
            <form className="form">
                <div className="form-row">
                    <label className="label">First Name:</label>
                    <input
                        type="text"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label className="label">Last Name:</label>
                    <input
                        type="text"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label className="label">Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label className="label">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label className="label">Address Line 1:</label>
                    <input
                        type="text"
                        value={address_line1}
                        onChange={(e) => setAddressLineOne(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label className="label">Address Line 2:</label>
                    <input
                        type="text"
                        value={address_line2}
                        onChange={(e) => setAddressLineTwo(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label className="label">City:</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label className="label">State:</label>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <label className="label">Zip Code:</label>
                    <input
                        type="text"
                        value={zip_code}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </div>
                <div className="centered">
                    <button type="button" onClick={(e) => registerUser(e)}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
