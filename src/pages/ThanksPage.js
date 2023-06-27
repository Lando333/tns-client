import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ThanksPage() {
    const location = useLocation();
    const [sessionID, setSessionID] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const sessionID = searchParams.get('session_id');
        setSessionID(sessionID);
    }, [location.search]);

    return (
        <div>
            <h1>Thank you for booking with us!</h1>
            {sessionID && <p>Session ID: {sessionID}</p>}
        </div>
    );
}

export default ThanksPage;
