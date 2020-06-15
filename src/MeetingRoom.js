/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component } from 'react';
import OT from '@opentok/client';

class App extends Component {
    state = {
        publisher: null,
        streamId: null,
        isActive: false,
    };

    componentDidMount() {
        this.initializeSession();
    }

    handleError = (error) => {
        if (error) {
            alert(error.message);
        }
    };

    initializeSession = () => {
        const { apiKey, sessionId, token } = this.props;

        this.session = OT.initSession(apiKey, sessionId);

        // Subscribe to a newly created stream

        // Create a publisher
        const publisher = OT.initPublisher(
            'original-publisher',
            {
                insertMode: 'append',
                width: '100%',
                height: '100%',
            },
            this.handleError
        );

        this.session.connect(token, (error) => {
            // If the connection is successful, publish to the session
            if (error) {
                this.handleError(error);
            } else {
                console.log(this);
                this.session.publish(publisher, this.handleError);
            }
        });

        this.session.on('streamCreated', (event) => {
            if (event.stream.videoType === 'screen') {
                this.setState({ isActive: true, streamId: event.stream.id });

                this.session.subscribe(
                    event.stream,
                    'original-screen',
                    {
                        insertMode: 'append',
                        width: '100%',
                        height: '100%',
                    },
                    this.handleError
                );
            } else {
                this.session.subscribe(
                    event.stream,
                    'original-subscriber',
                    {
                        insertMode: 'append',
                        width: '100%',
                        height: '100%',
                    },
                    this.handleError
                );
            }
        });

        this.session.on('streamDestroyed', (event) => {
            if (event.stream.id === this.state.streamId) {
                this.setState({ publisher: null, streamId: null, isActive: false });
            }
        });
    };

    handleStartShare = () =>
        OT.checkScreenSharingCapability((response) => {
            if (!response.supported || response.extensionRegistered === false) {
                // This browser does not support screen sharing.
            } else if (response.extensionInstalled === false) {
                // Prompt to install the extension.
            } else {
                // Screen sharing is available. Publish the screen.
                const publisher = OT.initPublisher(
                    'original-screen',
                    {
                        videoSource: 'screen',
                        insertMode: 'append',
                        width: '100%',
                        height: '100%',
                    },
                    (error) => {
                        if (error) {
                            // Look at error.message to see what went wrong.
                        } else {
                            this.session.publish(publisher, (error) => {
                                if (error) {
                                    // Look error.message to see what went wrong.
                                }
                            });
                        }
                    }
                );

                publisher.on('streamDestroyed', (event) => {
                    if (event.stream.id === this.state.streamId) {
                        this.setState({ publisher: null, streamId: null, isActive: false });
                    }
                });

                publisher.on('streamCreated', (event) => {
                    this.setState({
                        publisher,
                        streamId: event.stream.id,
                        isActive: true,
                    });
                });
            }
        });

    handleStopShare = () => {
        this.session.unpublish(this.state.publisher);
        this.setState({ isActive: false, publisher: null });
    };

    getOriginalSubscriberClassName = () => {
        if (this.state.isActive) {
            return 'original-subscriber';
        }

        return 'original-subscriber--active';
    };

    getOriginalScreenClassName = () => {
        if (this.state.isActive) {
            return 'original-screen--active';
        }

        return 'original-screen';
    };

    session = null;

    render() {
        return (
            <div className="app">
                <div className="wrapper">
                    <div className="original-publisher" id="original-publisher"></div>
                    <div className={this.getOriginalSubscriberClassName()} id="original-subscriber"></div>
                    <div className={this.getOriginalScreenClassName()} id="original-screen"></div>
                </div>
                {!this.state.isActive && (
                    <button onClick={this.handleStartShare} className="share-button">
                        Start share
                    </button>
                )}
                {this.state.publisher && (
                    <button onClick={this.handleStopShare} className="share-button">
                        Stop share
                    </button>
                )}
            </div>
        );
    }
}

export default App;
