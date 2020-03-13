// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

// Setup empty JS object to act as endpoint for all routes
// Make this object in new file to include it in route folder
projectData = {
  temperature: 'temp',
  date: 'date',
  userResponse: 'user-response'
};

// Start up an instance of app

/* Middleware*/
const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')} ${req.originalUrl}`);
  next();
};
// app.use(logger);
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const corsConfig = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  Credentials: false
};
app.use(cors());

// app.use((req, res, next) => {
//   res.header(
//     'Access-Control-Allow-Origin',
//     `${req.protocol}://${req.get('host')}${req.originalUrl}`
//   );
//   res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Credentials', true);
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'POST,PUT,GET,DELETE');
//     return res.status(200).json({});
//   }

//   next();
// });
// Initialize the main project folder
app.use(express.static(path.join(__dirname, 'website')));
// Init Route
app.use('/api/weather', require('./routes/api/weather'));
// Setup Server
const PORT = process.env.PORT || 6060;
app.listen(PORT, () => console.log('server is running  on ', PORT, '🔥'));
