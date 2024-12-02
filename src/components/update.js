
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Update(props) {
  let { id } = useParams();
  const [steps, setSteps] = useState('');
  const [distance, setDistance] = useState('');
  const [weight, setWeight] = useState('');
  const [caloriesIn, setCaloriesIn] = useState('');
  const [caloriesOut, setCaloriesOut] = useState('');
  const navigate = useNavigate();

useEffect(() => {
    axios.get('http://localhost:4000/api/entry/' + id)
        .then((response) => {
            setSteps(response.data.steps);
            setDistance(response.data.distance);
            setWeight(response.data.weight);
            setCaloriesIn(response.data.caloriesIn);
            setCaloriesOut(response.data.caloriesOut);
        })
        .catch((error) => {
            console.log(error);
        });
}, [id]);

const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = { id, steps, distance, weight, caloriesIn,caloriesOut };
    axios.put('http://localhost:4000/api/entry/' + id, newEntry)
        .then((res) => {
            console.log(res.data);
            navigate('/readHealth');
        });
}

return (
    <div>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Enter number of steps walked: </label>
        <input type="text"
          className="form-control"
          value={steps}
          onChange={(e) => { setSteps(e.target.value) }}
        />
      </div>

      <div className="form-group">
        <label>Enter Distance Covered: </label>
        <input type="text"
          className="form-control"
          value={distance}
          onChange={(e) => { setDistance(e.target.value) }}
        />
      </div>

      <div className="form-group">
        <label>Enter Weight: </label>
        <input type="text"
          className="form-control"
          value={weight}
          onChange={(e) => { setWeight(e.target.value) }}
        />
      </div>

      <div className="form-group">
        <label>Enter Calories Consumed: </label>
        <input type="text"
          className="form-control"
          value={caloriesIn}
          onChange={(e) => { setCaloriesIn(e.target.value) }}
        />
      </div>

      <div className="form-group">
        <label>Enter Calories Burned: </label>
        <input type="text"
          className="form-control"
          value={caloriesOut}
          onChange={(e) => { setCaloriesOut(e.target.value) }}
        />
      </div>

      <input type="submit" value="Edit Health Data" />
    </form>
  </div>
);
}