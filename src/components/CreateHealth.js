import { useState } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';


function AddHealthData() {
  const [steps, setSteps] = useState('');
  const [distance, setDistance] = useState('');
  const [weight, setWeight] = useState('');
  const [caloriesIn, setCaloriesIn] = useState('');
  const [caloriesOut, setCaloriesOut] = useState('');
  const [date, setDate] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Steps: ${steps}, Distance: ${distance}, Weight: ${weight}, CaloriesIn: ${caloriesIn}, CaloriesOut: ${caloriesOut}, Date: ${date}`);

    const entry = {
      steps: steps,
      distance: distance,
      weight: weight,
      caloriesIn: caloriesIn,
      caloriesOut: caloriesOut,
      date: date
    };

    axios.post('http://localhost:4000/api/entries', entry)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));
  }

  return (
    <div className="position-absolute top-50 start-50 translate-middle w-25 p-3">
      <Card>
        <Card.Body>
          <Card.Header>Please enter Details:</Card.Header>
          <blockquote className="blockquote mb-0">
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
                <label>Enter Distance Covered(km): </label>
                <input type="text"
                  className="form-control"
                  value={distance}
                  onChange={(e) => { setDistance(e.target.value) }}
                />
              </div>

              <div className="form-group">
                <label>Enter Weight(kg): </label>
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
                <label for="date">Enter Date</label>
                <input class="form-control"
                  type="date"
                  value={date}
                  onChange={(e) => { setDate(e.target.value) }}
                />
              </div>

              <button type="submit" class="btn btn-primary">Enter Health Data</button>
            </form>
          </blockquote>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AddHealthData;