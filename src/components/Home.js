import WeightGraph from "./WeightGraph";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  // Reload data from the server
  const Reload = () => {
    axios
      .get("http://localhost:4000/api/entries")
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
    <div>
      <h1>Home</h1>
      {/* Display the WeightGraph with the fetched data */}
      <WeightGraph entries={data} />
    </div>
  );
};

  
  export default Home;