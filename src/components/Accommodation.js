import React, { useState, useEffect } from 'react';

function Accommodation() {
    const [accommodations, setAccommodations] = useState([]);
    const [newAccommodationName, setNewAccommodationName] = useState('');
    const [newAccommodationLocation, setNewAccommodationLocation] = useState('');
    const [newAccommodationPrice, setNewAccommodationPrice] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/accommodations')
            .then(response => response.json())
            .then(data => setAccommodations(data));
    }, []);

    const handleAddAccommodation = (e) => {
        e.preventDefault();
        const newAccommodation = {
            name: newAccommodationName,
            location: newAccommodationLocation,
            price: newAccommodationPrice,
        };

        fetch('http://localhost:4000/accommodations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAccommodation),
        })
            .then(response => response.json())
            .then(data => {
                setAccommodations([...accommodations, data]);
                setNewAccommodationName('');
                setNewAccommodationLocation('');
                setNewAccommodationPrice('');
            });
    };

    const handleDeleteAccommodation = (id) => {
        fetch(`http://localhost:4000/accommodations/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setAccommodations(accommodations.filter(accommodation => accommodation.id !== id));
            });
    };

    return (
        <div>
            <h2>Accommodations</h2>
            <ul>
                {accommodations.map(accommodation => (
                    <li key={accommodation.id}>
                        {accommodation.name} - {accommodation.location} - ${accommodation.price}
                        <button onClick={() => handleDeleteAccommodation(accommodation.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Add a New Accommodation</h3>
            <form onSubmit={handleAddAccommodation}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={newAccommodationName}
                            onChange={(e) => setNewAccommodationName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Location:
                        <input
                            type="text"
                            value={newAccommodationLocation}
                            onChange={(e) => setNewAccommodationLocation(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input
                            type="text"
                            value={newAccommodationPrice}
                            onChange={(e) => setNewAccommodationPrice(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Add Accommodation</button>
            </form>
        </div>
    );
}

export default Accommodation;
