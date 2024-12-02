import { useEffect } from "react"; // Importing the use effext from react
import Card from 'react-bootstrap/Card'; //Importing card component from bootstrap

function EntryItem(props) {
  useEffect(() => {
    console.log("Entry Item:", props.myentry);
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
            <footer>{props.myEntry.Distance}</footer>
            <footer>{props.myEntry.Weight}</footer>
            <footer>{props.myEntry.CaloriesOut}</footer>
            <footer>{props.myEntry.CaloriesIn}</footer>
          </blockquote>
        </Card.Body>
      </Card>
    </div>
  );
}

//Exporting th emovie item to be used in movies
export default EntryItem;