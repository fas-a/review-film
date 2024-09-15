const express = require('express');
const cors = require('cors');
const app = express();
const dramaRoutes = require('./routes/drama');

// Enable CORS for all routes
app.use(cors());

// Or configure CORS to allow specific origins
app.use(cors({
  origin: 'http://localhost:3000' // Replace with your frontend origin
}));

// Define your routes
app.use('/api', dramaRoutes);

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
