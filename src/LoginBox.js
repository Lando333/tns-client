import React, { useContext } from "react";
import { Link } from "react-router-dom";
import httpClient from "./httpClient";
import { UserContext } from "./UserContext";
import Card from 'react-bootstrap/Card';


const LoginBox = ({ baseUrl }) => {
    const {user} = useContext(UserContext);

    const logoutUser = async () => {
        await httpClient.post(baseUrl + "/logout");
        window.location.href = "/";
    };

    if (user != null) {
        return <Card
                bg="secondary"
                border="secondary"
                key="secondary"
                style={{ width: '18rem' }}
                className="login">
                <Card.Body>
                    <Card.Title>
                    Welcome, {user.first_name}!<br />
                    {user.user_id}
                    </Card.Title>
                    <Card.Text>
                        <Link to="/" onClick={logoutUser}>Logout</Link>
                    </Card.Text>
                </Card.Body>
            </Card>


    } else {
        return (
            <Card
                bg="secondary"
                border="secondary"
                key="secondary"
                style={{ width: '18rem' }}
                className="login">
                <Card.Body>
                    <Card.Title>
                        You are not logged in
                    </Card.Title>
                    <Card.Text>
                        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
};

export default LoginBox;
