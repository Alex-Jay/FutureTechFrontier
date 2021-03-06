const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const passport      = require('passport');
const mongoose      = require('mongoose');
const config        = require('./config/database');

/* Connect to DB */
mongoose.connect(config.database, {useNewUrlParser: true});

/* On Connection Event */
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + config.database);
});

/* On Error Event */
mongoose.connection.on('error', (err) => {
    console.log('Database Error: ' + err);
});

/* Express Application */
const app = express();

/* CORS Middleware */
app.use(cors());

/* Require Users Endpoint */
const users = require('./routes/users');

/* Port */
var port = process.env.PORT || 4000;

/* Set Static Folder */
app.use(express.static(path.join(__dirname, 'public')));

/* Body Parser Middleware */
app.use(bodyParser.json());

/* Passport Middleware */
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

/* Users Endpoint */
app.use('/users', users);

/* Index Route */
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

/* Start Server */
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});