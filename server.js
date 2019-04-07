// import the dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//initialising the express
const app = express();

// routes
const UserRoutes = require('./routes/users');

// DB Config
const db = require('./config/keys').mongoURI;

//connect to mongoDB with mongoose
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// middleware
app.use(bodyParser.json());

// middleware
app.get('/', (req, res, next) => {
    res.send('i am alive')
});

// import the routes
app.use('/users',UserRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));