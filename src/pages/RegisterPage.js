import React, { useState } from "react"
import httpClient from "../httpClient"

const RegisterPage = ({baseUrl}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")

    const [address_line1, setAddressLineOne] = useState("")
    const [address_line2, setAddressLineTwo] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip_code, setZipCode] = useState("")
    const [country, setCountry] = useState("")


    const registerUser = async () => {
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
                country
            });

            window.location.href = "/";
        } catch (error) {
            if (error.response.status === 401) {
                alert("Invalid credentials");
            }
        }
    };

    return (
        <div>
            <h1>Create an account</h1>
            <form>
                <div>
                    <label>First Name: </label>
                    <input
                        type="text"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Last Name: </label>
                    <input
                        type="text"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email: </label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label>Address Line 1: </label>
                    <input
                        type="text"
                        value={address_line1}
                        onChange={(e) => setAddressLineOne(e.target.value)}
                    />
                </div>
                <div>
                    <label>Address Line 2: </label>
                    <input
                        type="text"
                        value={address_line2}
                        onChange={(e) => setAddressLineTwo(e.target.value)}
                    />
                </div>
                <div>
                    <label>City: </label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div>
                    <label>State: </label>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>
                <div>
                    <label>Zip Code: </label>
                    <input
                        type="text"
                        value={zip_code}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </div>
                <div>
                    <label>Country: </label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>

                <button type="button" onClick={() => registerUser()}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
