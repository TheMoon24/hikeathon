import React, { Component } from 'react';

class Position extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error: null
        };
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    this.setState({ error: error.message });
                }
            );
        } else {
            this.setState({ error: 'Geolocation is not supported by this browser.' });
        }
    }

    render() {
        const { latitude, longitude, error } = this.state;

        return (
            <div>
                <h1>Position Coordinates</h1>
                {error ? (
                    <p>Error: {error}</p>
                ) : (
                    <div>
                        <p>Latitude: {latitude}</p>
                        <p>Longitude: {longitude}</p>
                    </div>
                )}
            </div>
        );
    }
}

export default Position;