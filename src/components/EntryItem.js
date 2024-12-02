import { useEffect } from "react"; // Importing the use effext from react
import Card from 'react-bootstrap/Card'; //Importing card component from bootstrap

function EntryItem(props) {
  useEffect(() => {
    console.log("Entry Item:", props.myEntry);
  }, [props.myentry]); // Only run this effect when the mymovie prop changes
  //Creates a bootsrap card that displays the movie poster, year
  return (
    <div>
      <Card>
        {/* Card header displays the movie title */}
        <Card.Header>{props.myEntry.Steps}</Card.Header>
        {/* Card body displays the movies image and year */}
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <footer>{props.myEntry.distance}</footer>
            <footer>{props.myEntry.weight}</footer>
            <footer>{props.myEntry.caloriesOut}</footer>
            <footer>{props.myEntry.caloriesIn}</footer>
          </blockquote>
        </Card.Body>
      </Card>
    </div>
  );
}

//Exporting th emovie item to be used in movies
export default EntryItem;