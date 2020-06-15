/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef,useEffect } from 'react';
import OT from '@opentok/client';
import qs from 'qs';

const getQsData = (defaultParameter = {}) => {
  if (window.location.search) {
      return { ...defaultParameter, ...qs.parse(window.location.search, { ignoreQueryPrefix: true }) };
  }

  return defaultParameter;
};

const App = () => {
    const { apiKey, sessionId, token } = getQsData();

    const session = useRef(null);

    const handleError = (error) => {
        if (error) {
          alert(error.message);
        }
      }

    const initializeSession = () => {
        session.current = OT.initSession(apiKey, sessionId);
      
        // Subscribe to a newly created stream
      
        // Create a publisher
        var publisher = OT.initPublisher('original-publisher', {
          insertMode: 'replace',
          width: '100%',
          height: '100%'
        }, handleError);
      
        // Connect to the session
        session.current.connect(token, function(error) {
          // If the connection is successful, publish to the session
          if (error) {
            handleError(error);
          } else {
            session.current.publish(publisher, handleError);
          }
        });

        session.current.on('streamCreated', function(event) {
            session.current.subscribe(event.stream, 'original-subscriber', {
              insertMode: 'replace',
              width: '100%',
              height: '100%'
            }, handleError);
          });

      }

      const handleShare = () => OT.checkScreenSharingCapability(function(response) {
        if(!response.supported || response.extensionRegistered === false) {
          // This browser does not support screen sharing.
        } else if (response.extensionInstalled === false) {
          // Prompt to install the extension.
        } else {

            console.log(OT.initPublisher)
          // Screen sharing is available. Publish the screen.
          var publisher = OT.initPublisher('original-publisher',
            {videoSource: 'screen', insertMode: 'replace', width: '100%', height: '100%'},
            function(error) {
              if (error) {
                // Look at error.message to see what went wrong.
              } else {
                session.current.publish(publisher, function(error) {
                  if (error) {
                    // Look error.message to see what went wrong.
                  }
                });
              }
            }
          );
        }
      });

    useEffect(() => {
        initializeSession();
    }, []);

    return (
    <div className="app">
        <div className="wrapper">
            <div className="original-publisher">
                <div id="original-publisher"></div>
            </div>
            <div className="original-subscriber">
                <div id="original-subscriber"></div>
            </div>
            <button className="share-button" onClick={handleShare}>Share</button>
        </div>
    </div>
)}

export default App;
