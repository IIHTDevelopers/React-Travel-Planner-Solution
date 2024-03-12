import React, { useState, useEffect } from 'react';

function BudgetTracker() {
    const [budgetItems, setBudgetItems] = useState([]);
    const [newItemDescription, setNewItemDescription] = useState('');
    const [newItemAmount, setNewItemAmount] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/budgets')
            .then(response => response.json())
            .then(data => setBudgetItems(data));
    }, []);

    const handleAddBudgetItem = (e) => {
        e.preventDefault();
        const newItem = {
            description: newItemDescription,
            amount: parseFloat(newItemAmount),
        };

        fetch('http://localhost:4000/budgets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        })
            .then(response => response.json())
            .then(data => {
                setBudgetItems([...budgetItems, data]);
                setNewItemDescription('');
                setNewItemAmount('');
            });
    };

    const handleDeleteBudgetItem = (id) => {
        fetch(`http://localhost:4000/budgets/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setBudgetItems(budgetItems.filter(item => item.id !== id));
            });
    };

    const totalBudget = budgetItems.reduce((total, item) => total + item.amount, 0);

    return (
        <div>
            <h2>Budget Tracker</h2>
            <ul>
                {budgetItems.map(item => (
                    <li key={item.id}>
                        {item.description}: ${item.amount.toFixed(2)}
                        <button onClick={() => handleDeleteBudgetItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>Total Budget: ${totalBudget.toFixed(2)}</div>
            <h3>Add a New Budget Item</h3>
            <form onSubmit={handleAddBudgetItem}>
                <div>
                    <label>
                        Description:
                        <input
                            type="text"
                            value={newItemDescription}
                            onChange={(e) => setNewItemDescription(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Amount:
                        <input
                            type="number"
                            step="0.01"
                            value={newItemAmount}
                            onChange={(e) => setNewItemAmount(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
}

export default BudgetTracker;