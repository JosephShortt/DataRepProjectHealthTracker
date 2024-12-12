
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Card } from 'react-bootstrap';

export default function  (props) {
  //extracts the id from the url
  const { id } = useParams();
  //useStates for each entry detail
  const [steps, setSteps] = useState('');
  const [distance, setDistance] = useState('');
  const [weight, setWeight] = useState('');
  const [caloriesIn, setCaloriesIn] = useState('');
  const [caloriesOut, setCaloriesOut] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/api/entry/' + id)
      .then((response) => {
        setSteps(response.data.steps);
        setDistance(response.data.distance);
        setWeight(response.data.weight);
        setCaloriesIn(response.data.caloriesIn);
        setCaloriesOut(response.data.caloriesOut);
        setDate(response.data.date)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //when user updates an entry, it ovewrites the existing entry with new details
  const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = { id, steps, distance, weight, caloriesIn, caloriesOut, date };
    axios.put('http://localhost:4000/api/entry/' + id, newEntry)
      .then((res) => {
        console.log(res.data);
        navigate('/readHealth');
      });
  }

  //Update entry details form
  return (
    <div className="position-absolute top-50 start-50 translate-middle w-25 p-3">
      <Card>
        <Card.Body>
        <Card.Header>Please Enter Details To Update Entry:</Card.Header>
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

            <div>
              <label for="startDate">Enter Date</label>
              <input class="form-control"
                type="date"
                value={date}
                onChange={(e) => { setDate(e.target.value) }}
              />
            </div>

            <button type="submit" class="btn btn-success">Edit Health Data</button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}