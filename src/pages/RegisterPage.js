import React, { useState } from "react"
import httpClient from "../httpClient"

const RegisterPage = ({baseUrl}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")

    const registerUser = async () => {
        try {
            const resp = await httpClient.post(baseUrl + "/register", {
                email,
                password,
                first_name,
                last_name
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
                        id=""
                    />
                </div>

                <div>
                    <label>Last Name: </label>
                    <input
                        type="text"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        id=""
                    />
                </div>

                <div>
                    <label>Email: </label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id=""
                    />
                </div>

                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id=""
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
