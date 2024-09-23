const express = require('express');
const cors = require('cors');
const app = express();
const dramaRoutes = require('./routes/drama');
const passport = require('passport');
require('./config/passport-setup');
const session = require('express-session');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

dotenv.config();

app.use(cors());
app.use(passport.initialize());
app.use(express.json());


app.use(cors({
  origin: 'http://localhost:3000' 
}));

app.use(session({ secret: 'your-secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', dramaRoutes);
app.use('/auth', require('./routes/auth'));

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
