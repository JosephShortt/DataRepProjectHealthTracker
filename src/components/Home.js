//import steps and weight graph's
import WeightGraph from "./WeightGraph";
import StepsGraph from "./StepsGraph";

import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'; //Importing card component from bootstrap
import { CardHeader, CardTitle } from "react-bootstrap";

const Home = () => {
  //Defines useState hook to hold entries array
  const [data, setData] = useState([]);

  // Reload data from the server
  const Reload = () => {
    //Requests entries from server api
    axios.get("http://localhost:4000/api/entries")
      .then((response) => {
        setData(response.data.entries); // Set the data state with the fetched entries
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    Reload(); // Reload the data when the component mounts
  }, []);

  return (
    <div className="container bg-info-subtle">
      <h1 className="text-center mt-4 text-dark-emphasis">Welcome to the Health Tracker</h1>
      <Card className="mt-4">
        <CardHeader>Graph of Weight Over Time</CardHeader>
        <Card.Body>
          {/* Display the WeightGraph with the fetched data */}
          <WeightGraph entries={data} />
        </Card.Body>
      </Card>

      <Card className="mt-4">
      <CardHeader>Graph of Steps Over Time</CardHeader>
        <Card.Body>
          {/* Display the StepsGraph with the fetched data */}
          <StepsGraph entries={data} />
        </Card.Body>
      </Card>
    </div>
  );
};


export default Home;