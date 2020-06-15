import React, { useState } from 'react';
import qs from 'qs';
import history from './history';

export const redirectTo = ({ path, state, query, replacePrevHistory }) => {
    const search = query && qs.stringify(query);
    // add new flag to location state, that can be used in history go back function
    const updatedState = { isRedirectedFromApp: true, ...state };
    const payload = { pathname: path, state: updatedState, search: `?${search || ''}` };

    return replacePrevHistory ? history.replace(payload) : history.push(payload);
};


const HomePage = () => {
    const [isLoading, setLoading] = useState(false);

    const handleStartMeeting = async () => {
        var SERVER_BASE_URL = 'https://opentok-sample12.herokuapp.com/';

        const response = await fetch(SERVER_BASE_URL + '/session');
        const data = await response.json();

        redirectTo({ path: '/meeting', query: data });
        window.location.reload(false); 
    }

    if (isLoading) return <div>Loading ...</div>

    return (
    <button onClick={handleStartMeeting}>Start a meeting</button>
)};

export default HomePage;