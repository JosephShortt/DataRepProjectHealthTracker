import Entries from "./Entries";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function ReadHealthData() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState(''); // To store the text entered in the input field
  const navigate = useNavigate();

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


  const handleSubmit = (event) => {
    event.preventDefault();
    // Navigate to the entry's page using the entered ID
    if (searchText) {
      navigate(`/entry/${searchText}`);
    }
  };




  return (
    <div>
      <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="search" placeholder="Search Entry by ID" aria-label="Search" 
        value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      <Entries myEntries={data} ReloadData={Reload} />
    </div>
  );
}
export default ReadHealthData;