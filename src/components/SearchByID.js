import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import { Card } from 'react-bootstrap';

function SearchByID() {
    // Extract the ID from the URL
    const { id } = useParams(); 
    const [entry, setEntry] = useState('');

    //fetches the data for thee entry given the search text
    useEffect(() => {
        axios.get(`http://localhost:4000/api/entries/${id}`)
            .then((response) => {
                setEntry(response.data); // Set the entry data received from the API
            })
            .catch((error) => {
                console.error('Error fetching entry:', error);
            });
    }, [id]); 

    if (!entry) {
        return <div>No entries matching that ID...</div>;
    }

    //Return the fetched entry in a bootstrap card
    return (
        <div>
            <Card>
                <Card.Header>Date: {entry.date}</Card.Header>
                <Card.Body>
                    <h2>Entry Details</h2>
                    <p><strong>Steps:</strong> {entry.steps}</p>
                    <p><strong>Distance:</strong> {entry.distance}</p>
                    <p><strong>Weight:</strong> {entry.weight}</p>
                    <p><strong>Calories In:</strong> {entry.caloriesIn}</p>
                    <p><strong>Calories Out:</strong> {entry.caloriesOut}</p>
                    <p><strong>Date:</strong> {entry.date}</p>
                </Card.Body>
            </Card>
        </div>
    );
}

export default SearchByID;
