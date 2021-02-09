import React, { useState, useEffect } from 'react';

import MeetingRoom from './MeetingRoom';

const HomePage = () => {
    const [meetingData, setMeetingData] = useState(null);

    const startMeeting = async () => {
        const SERVER_BASE_URL = 'https://opentok-routed.herokuapp.com/';

        const response = await fetch(SERVER_BASE_URL + '/session');
        const data = await response.json();

        setMeetingData(data);
    }

    useEffect(startMeeting, []);

    if (meetingData) return <MeetingRoom { ...meetingData } />

    return <div>Loading...</div>;
}

export default HomePage;