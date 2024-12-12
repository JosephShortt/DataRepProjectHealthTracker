const express = require('express'); // Import the express framework

//Creating an instance of express application
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

//Instance of mongoose to define schema for data
const mongoose = require('mongoose');

//Connect mongoose to mongo database
mongoose.connect('mongodb+srv://admin:admin@cluster0.jbjg9.mongodb.net/MyHealthTrackerDB');

//Defines Schema for entries
const entrySchema = new mongoose.Schema({
  steps: Number,
  distance: Number,
  weight: Number,
  caloriesIn: Number,
  caloriesOut: Number,
  date: String

});
//Define entry model using the schema
const EntryModel = new mongoose.model('myEntries', entrySchema);

//Handles get requests to return json of all entries
app.get('/api/entries', async (req, res) => {
  const entries = await EntryModel.find({});  
  res.json({ entries });
});

//Handles get requests to return specific entry by its id
app.get('/api/entries/:id', async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid ObjectId
  if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
      //find by id, uses await before sending the res
      const entry = await EntryModel.findById(id);
      if (!entry) {
          return res.status(404).json({ error: 'Entry not found' });
      }
      res.json(entry);
  } catch (error) {
      console.error('Error fetching entry:', error);
      res.status(500).json({ error: 'Server error' });
  }
});

//handles put request to update entry
app.put('/api/entry/:id', async (req, res) => {
  let entry = await EntryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(entry);
});

//Handles delete request
app.delete('/api/entry/:id', async (req, res) => {

  console.log('Deleting entry with ID:', req.params.id);

  const entry = await EntryModel.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: "Entry deleted successfully", entry });

});

//Handles the creation of entries, stores in database
app.post('/api/entries', async (req, res) => {

  console.log("Entry: " + req.body.Steps);
  const { steps, distance, weight, caloriesIn, caloriesOut, date } = req.body;
  const newEntry = new EntryModel({ steps, distance, weight, caloriesIn, caloriesOut, date });
  await newEntry.save();
  res.status(201).json({ message: 'Entry created successfully', entry: newEntry });

});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});