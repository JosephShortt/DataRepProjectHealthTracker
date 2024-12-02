import { useState } from "react";
import axios from "axios";


function AddHealthData() {
  const [steps, setSteps] = useState('');
  const [distance, setDistance] = useState('');
  const [weight, setWeight] = useState('');
  const [caloriesIn, setCaloriesIn] = useState('');
  const [caloriesOut, setCaloriesOut] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Steps: ${steps}, Distance: ${distance}, Weight: ${weight}, CaloriesIn: ${caloriesIn}, CaloriesOut: ${caloriesOut}`);

    const entry = {
      steps: steps,
      distance: distance,
      weight: weight,
      caloriesIn: caloriesIn,
      caloriesOut: caloriesOut
    };

    axios.post('http://localhost:4000/api/entries', entry)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));
  }

  return (
    <div>
      <h2>This is my Create Component.</h2>
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

        <input type="submit" value="Enter Health Data" />
      </form>
    </div>
  );
}

  export default AddHealthData;