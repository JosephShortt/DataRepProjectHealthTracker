import { useEffect } from "react"; // Importing the use effext from react
import Card from 'react-bootstrap/Card'; //Importing card component from bootstrap
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import axios from "axios";

function EntryItem(props) {
  useEffect(() => {
    console.log("Entry Item:", props.myEntry);
  }, [props.myentry]);

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete('http://localhost:4000/api/entry/' + props.myEntry._id)
      .then(() => {
        props.Reload();
      })
      .catch((error) => {
        console.error("Error deleting entry:", error);
      });
  };

  const calculateDaysAgo = (entryDate) => {
    const today = new Date(); // Current date
    const entry = new Date(entryDate); // Convert entry date string to Date object
    const differenceInTime = today - entry; // Difference in milliseconds
    const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return differenceInDays;
  };

  return (
    <div>
      <Card>
        <Card.Header>Date: {props.myEntry.date}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <footer>Steps: {props.myEntry.steps}</footer>
            <footer>Distance(km): {props.myEntry.distance}</footer>
            <footer>Weight(kg): {props.myEntry.weight}</footer>
            <footer>Calories Burned: {props.myEntry.caloriesOut}</footer>
            <footer>Calories consumed: {props.myEntry.caloriesIn}</footer>
            <footer>Date: {props.myEntry.date}</footer>
          </blockquote>
        </Card.Body>
        <Link to={"/update/" + props.myEntry._id} className="btn btn-success w-25">Update</Link>
        <Button type="button" className="btn btn-danger w-25" onClick={handleDelete}>Delete</Button>
        <Card.Footer>
          {`Entry was made ${calculateDaysAgo(props.myEntry.date)} days ago`}
        </Card.Footer>
      </Card>
    </div>
  );
}

export default EntryItem;