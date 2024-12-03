import { useEffect } from "react"; // Importing the use effext from react
import Card from 'react-bootstrap/Card'; //Importing card component from bootstrap
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import axios from "axios";

function EntryItem(props) {
  useEffect(() => {
    console.log("Entry Item:", props.myEntry);
  }, [props.myentry]); // Only run this effect when the mymovie prop changes
  //Creates a bootsrap card that displays the movie poster, year

  const handleDelete = (e) => {
    e.preventDefault();
    //Deletes the movie with the given ID using axios.deleted
    axios.delete('http://localhost:4000/api/entry/' + props.myEntry._id)
      .then(() => {
        props.Reload(); // Refresh the movie list after deletion
      })
      .catch((error) => {
        console.error("Error deleting entry:", error);
      });
  };

  return (
    <div>
      <Card>
        {/* Card header displays the movie title */}
        <Card.Header>Steps: {props.myEntry.steps}</Card.Header>
        {/* Card body displays the movies image and year */}
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <footer>Distance(km): {props.myEntry.distance}</footer>
            <footer>Weight(kg): {props.myEntry.weight}</footer>
            <footer>Calories Burned: {props.myEntry.caloriesOut}</footer>
            <footer>Calories consumed: {props.myEntry.caloriesIn}</footer>
            <footer>Date: : {props.myEntry.date}</footer>

          </blockquote>
        </Card.Body>
        <Link  to={"/update/" + props.myEntry._id} className="btn btn-success w-25">Update</Link>
        <Button type="button"   className="btn btn-danger w-25" onClick={handleDelete}>Delete</Button>
      </Card>
    </div>
  );
}

//Exporting th emovie item to be used in movies
export default EntryItem;