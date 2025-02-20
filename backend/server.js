// npm install dotenv
require('dotenv').config();

const express = require('express');

// express app
const app = express();

// 📦 middleware
app.use((req, res, next) => {
  // this will fire for every request that comes in to our express app
  console.log(req.path, req.method);
  // without calling next when we're finished with our middleware, we never advance to app.get, or app.post etc.
  next();
});

// 🪢 routes
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the app' });
});

app.get('/workouts', (req, res) => {});
app.post('/workouts', (req, res) => {});
app.get('/workouts/:id', (req, res) => {});
app.delete('/workouts/:id', (req, res) => {});
app.patch('/workouts/:id', (req, res) => {});

// 📡 listen for requests on port 4000
app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT);
});
