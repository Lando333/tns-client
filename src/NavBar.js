import React from "react";
import { Link } from "react-router-dom";
import LoginBox from "./LoginBox";

const NavBar = ({ baseUrl }) => {
    const user = useContext(UserContext);
    const [isTherapist, setIsTherapist] = useState(false);

    useEffect(() => {
        const fetchTherapists = async () => {
            try {
                const response = await fetch(`${baseUrl}/all_therapists`);
                if (response.ok) {
                    const therapists = await response.json();
                    const therapistIds = therapists.map((therapist) => therapist.therapist_id);
                    setIsTherapist(therapistIds.includes(user.therapist_id));
                } else {
                    // Handle error response
                    console.error("Failed to fetch therapists");
                }
            } catch (error) {
                // Handle fetch error
                console.error("Error while fetching therapists", error);
            }
        };

        if (user && user.role === "therapist") {
            fetchTherapists();
        }
    }, [baseUrl, user]);

    return (<>
        <nav>
            <ul className="navbar">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/schedule">Schedule</Link>
                </li>
                <li>
                    <Link to="/membership">Membership</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                {isTherapist && <li>
                    <Link to="/therapist">Therapist Profile</Link>
                </li>}
            </ul>
            <LoginBox baseUrl={baseUrl} />
        </nav>
    </>
    );
};

export default NavBar;
