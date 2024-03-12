import React, { useState, useEffect } from 'react';

function Itinerary() {
    const [itineraries, setItineraries] = useState([]);
    const [newItineraryTitle, setNewItineraryTitle] = useState('');
    const [newItineraryDescription, setNewItineraryDescription] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/itineraries')
            .then(response => response.json())
            .then(data => setItineraries(data));
    }, []);

    const handleAddItinerary = (e) => {
        e.preventDefault();
        const newItinerary = {
            title: newItineraryTitle,
            description: newItineraryDescription,
        };

        fetch('http://localhost:4000/itineraries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItinerary),
        })
            .then(response => response.json())
            .then(data => {
                setItineraries(itineraries.concat(data));
                setNewItineraryTitle('');
                setNewItineraryDescription('');
            });
    };

    const handleDeleteItinerary = (id) => {
        fetch(`http://localhost:4000/itineraries/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setItineraries(itineraries.filter(itinerary => itinerary.id !== id));
            });
    };

    return (
        <div>
            <h2>Itinerary Planner</h2>
            <ul>
                {itineraries.map(itinerary => (
                    <li key={itinerary.id}>
                        {itinerary.title} - {itinerary.description}
                        <button onClick={() => handleDeleteItinerary(itinerary.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Add a New Itinerary</h3>
            <form onSubmit={handleAddItinerary}>
                <div>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={newItineraryTitle}
                            onChange={(e) => setNewItineraryTitle(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <textarea
                            value={newItineraryDescription}
                            onChange={(e) => setNewItineraryDescription(e.target.value)}
                        ></textarea>
                    </label>
                </div>
                <button type="submit">Add Itinerary</button>
            </form>
        </div>
    );
}

export default Itinerary;