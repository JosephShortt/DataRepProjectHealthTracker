import Entries from "./Entries";
import { useEffect, useState } from "react";
import axios from "axios";

function ReadHealthData() {
    // Define a state variable 'movies' and a setter 'setMovies' to store movie data fetched from the API
    const [data, setData] = useState([]);

    const Reload = () => {
      console.log("Reloading entry data...");
      axios.get('http://localhost:4000/api/entries')
          .then((response) => {
              setData(response.data.entries);
          })
          .catch((error) => {
              console.error("Error reloading data:", error);
          });
  };

  useEffect(() => {
    Reload();
}, []);

  
    return (
      <div>
        <h2>This is my Read Component.</h2>
        {/* Pass the fetched movies as a prop (myMovies) to the Movies component for rendering */}
        <Entries myEntries={data} ReloadData={Reload}/>
      </div>
    );
  }
export default ReadHealthData;