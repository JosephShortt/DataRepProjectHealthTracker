import Entries from "./Entries";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function ReadHealthData() {
  //entries is stored in data using useState
  const [data, setData] = useState([]);
  //useState for entered text for entry by ID
  const [searchText, setSearchText] = useState(''); // To store the text entered in the input field
  
  const navigate = useNavigate();

  //Reload function to reload entries array whenever the component mounts
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
  //Use effect hook to re-render the entries upon mounting 
  useEffect(() => {
    Reload();
  }, []);

  //Handle submit is called whenever the user submits an ID
  const handleSubmit = (event) => {
    event.preventDefault();
    // Navigate to the entry's page using the entered ID
    if (searchText) {
      navigate(`/entry/${searchText}`);
    }
  };




  return (
    <div className=" bg-info-subtle">
      <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
        {/*
        Input field for search entry
        Sets search text to the id enetered by user
        */}
        <input className="form-control mr-sm-2" type="search" placeholder="Search Entry by ID" aria-label="Search" 
        value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      {/* Pass data and reload function to Entries which renders the grid of entries*/}
      <Entries myEntries={data} ReloadData={Reload} />
    </div>
  );
}
export default ReadHealthData;