import React, { useState, useEffect } from 'react';

function Transportation() {
    const [transportations, setTransportations] = useState([]);
    const [newTransportationType, setNewTransportationType] = useState('');
    const [newTransportationDetails, setNewTransportationDetails] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/transportations')
            .then(response => response.json())
            .then(data => setTransportations(data));
    }, []);

    const handleAddTransportation = (e) => {
        e.preventDefault();
        const newTransportation = {
            type: newTransportationType,
            details: newTransportationDetails,
        };

        fetch('http://localhost:4000/transportations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTransportation),
        })
            .then(response => response.json())
            .then(data => {
                setTransportations([...transportations, data]);
                setNewTransportationType('');
                setNewTransportationDetails('');
            });
    };

    const handleDeleteTransportation = (id) => {
        fetch(`http://localhost:4000/transportations/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setTransportations(transportations.filter(transportation => transportation.id !== id));
            });
    };

    return (
        <div>
            <h2>Transportation Options</h2>
            <ul>
                {transportations.map(transportation => (
                    <li key={transportation.id}>
                        {transportation.type} - {transportation.details}
                        <button onClick={() => handleDeleteTransportation(transportation.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Add a New Transportation Option</h3>
            <form onSubmit={handleAddTransportation}>
                <div>
                    <label>
                        Type:
                        <input
                            type="text"
                            value={newTransportationType}
                            onChange={(e) => setNewTransportationType(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Details:
                        <input
                            type="text"
                            value={newTransportationDetails}
                            onChange={(e) => setNewTransportationDetails(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Add Transportation</button>
            </form>
        </div>
    );
}

export default Transportation;
