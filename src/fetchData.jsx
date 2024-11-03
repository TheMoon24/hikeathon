import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Fetchdata = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/yourmodel')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    const addItem = (name) => {
        axios.post('http://localhost:5000/api/yourmodel', { name })
            .then(response => {
                console.log(response.data.message);
                // Optionally fetch items again to update the state
            })
            .catch(error => {
                console.error("There was an error adding the item!", error);
            });
    };

    return (
        <div>
            <h1>Items</h1>
            <ul>
                {items.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            {/* Add form or button to call addItem */}
        </div>
    );
};

export default Fetchdata;
