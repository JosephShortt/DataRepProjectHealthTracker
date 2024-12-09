import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";


function SearchByID() {
    const { id } = useParams(); // Extract the ID from the URL
    const [entry, setEntry] = useState(''); // To store the entry data

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

    return (
        <div>
            <h2>Entry Details</h2>
            <p><strong>Steps:</strong> {entry.steps}</p>
            <p><strong>Distance:</strong> {entry.distance}</p>
            <p><strong>Weight:</strong> {entry.weight}</p>
            <p><strong>Calories In:</strong> {entry.caloriesIn}</p>
            <p><strong>Calories Out:</strong> {entry.caloriesOut}</p>
            <p><strong>Date:</strong> {entry.date}</p>
        </div>
    );
}

export default SearchByID;
