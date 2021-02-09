import React, { useRef, useEffect } from 'react';
import OT from '@opentok/client';

const MeetingRoom = ({ apiKey, sessionId, token }) => {
    const session = useRef(null);

    const handleError = (error) => {
        if (error) alert(error.message);
    };

    const initializeSession = () => {
        session.current = OT.initSession(apiKey, sessionId);

        const publisher = OT.initPublisher(
            'original-publisher',
            {
                insertMode: 'append',
                width: '100%',
                height: '100%',
                publishVideo: false,
                videoSource: null,
            },
            handleError
        );

        session.current.connect(token, (error) => {
            if (error) {
                handleError(error);
            } else {
                session.current.publish(publisher, handleError);
            }
        });

        session.current.on('streamCreated', (event) => {
            session.current.subscribe(
                event.stream,
                'original-subscriber',
                {
                    insertMode: 'append',
                    width: '100%',
                    height: '100%',
                },
                handleError
            );
        });

        session.current.on('streamDestroyed', event => {
            console.log('subscriber stream destroyed: ', event);
        })
    }

    useEffect(initializeSession, []);

    return (
        <div className="app">
            <div className="wrapper">
                <div id="original-publisher" className="original-publisher"></div>
                <div id="original-subscriber" className="original-subscriber"></div>
            </div>
        </div>
    );
}

export default MeetingRoom;
