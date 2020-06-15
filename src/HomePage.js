import React, { useState } from 'react';

import MeetingRoom from './MeetingRoom';

const HomePage = () => {
    const [meetingData, setMeetingData] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const handleStartMeeting = async () => {
        const SERVER_BASE_URL = 'https://opentok-sample12.herokuapp.com/';

        setLoading(true);

        const response = await fetch(SERVER_BASE_URL + '/session');
        const data = await response.json();

        setMeetingData(data);
    }

    if (meetingData) return <MeetingRoom { ...meetingData } />

    if (isLoading) return <div>Loading ...</div>

    return (
    <button onClick={handleStartMeeting}>Start a meeting</button>
)};

export default HomePage;