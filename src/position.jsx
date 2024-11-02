class Position {
    constructor(props) {
        this.state = {
            latitude: null,
            longitude: null,
            error: null
        };
    }

    getCoords() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const coords = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        };
                        resolve(coords);
                    },
                    (error) => {
                        reject(error.message);
                    }
                );
            } else {
                reject('Geolocation is not supported by this browser.');
            }
        });
    }
}

export default Position;