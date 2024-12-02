import Entries from "./Entries";
import { useEffect, useState } from "react";
import axios from "axios";

function ReadHealthData() {
    // Define a state variable 'movies' and a setter 'setMovies' to store movie data fetched from the API
    const [entries, setEntries] = useState([]);
  
    // useEffect hook to handle side effects such as data fetching
    useEffect(() => {
    
      // Make a GET request to the provided API endpoint using axios
      axios.get('http://localhost:4000/api/entries')
        .then((response) => {
          // If the request is successful, update the movies state with the data from the response
          setEntries(response.data.entries);
        })
        .catch((error) => {
          // Handle any errors during the request by logging them to the console
          console.log(error);
        });
    }, []);
    // Empty dependency array means the effect runs only once, when the component is first mounted
  
    return (
      <div>
        <h2>This is my Read Component.</h2>
        {/* Pass the fetched movies as a prop (myMovies) to the Movies component for rendering */}
        <Entries myEntries={entries} />
      </div>
    );
  }
export default ReadHealthData;