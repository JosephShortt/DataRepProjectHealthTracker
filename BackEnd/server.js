const express = require('express'); // Import the express framework
const app = express();
const port = 4000;

// Enable CORS (Cross-Origin Resource Sharing)
const cors = require('cors');
app.use(cors()); // Allow cross-origin requests

//handle CORS headers manually
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Import body-parser to handle JSON and URL-encoded data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // Enable URL-encoded data parsing
app.use(bodyParser.json()); // Enable JSON data parsing

const mongoose = require('mongoose');
//Connect to mongoose db using specific string
mongoose.connect('mongodb+srv://admin:admin@cluster0.jbjg9.mongodb.net/MyHealthTrackerDB');

//Define movie schema for the documents
const entrySchema = new mongoose.Schema({
    steps: String,
    distance: String,
    weight: String,
    caloriesIn: String,
    caloriesOut: String

});
//Create a movied model for myMovies
const EntryModel = new mongoose.model('myEntries', entrySchema);


// Define a GET endpoint to return a list of movies
app.get('/api/entries', async (req, res) => {
    const entries = await EntryModel.find({});
    res.json({ entries }); 
  });
  
  //Request spcific movie details using asynchronous 
  app.get('/api/entries/:id', async (req, res) => {
    const entry = await EntryModel.findById(req.params.id);
    res.json(entry);
  });

  app.put('/api/entry/:id', async (req, res) => {
    let entry = await EntryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(entry);
  });

// Defining a DELETE route to handle requests for deleting a movie by its ID
app.delete('/api/entry/:id', async (req, res) => {
  
    console.log('Deleting entry with ID:', req.params.id);
    // Using the MovieModel to find and delete the movie with the given ID
    // The ID is extracted from the request parameters (req.params.id)
    const entry = await EntryModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Entry deleted successfully", entry });
    
  });

// Define a POST endpoint to receive and log a new movie
app.post('/api/entries', async (req, res) => {

    console.log("Entry: " + req.body.Steps);
    const { steps, distance, weight,caloriesIn,caloriesOut } = req.body;
    const newEntry = new EntryModel({ steps, distance, weight,caloriesIn,caloriesOut });
    await newEntry.save();
    res.status(201).json({ message: 'Entry created successfully', entry: newEntry });

});
// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});