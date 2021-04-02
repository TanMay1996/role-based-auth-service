require('dotenv').config();
const express = require("express");
const cors = require("cors");
expressLogging = require('express-logging'),
logger = require('logops');


const app = express();

//setting cors options
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

//body/urlencoded data parsing into json
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(expressLogging(logger));

app.get("/a", (req, res) => {
    res.status(200).json({ message: "services is Working!!!." });
});

app.use('/users', require('./routes/user.route'));
app.use('/roles', require('./routes/role.route'));
app.use('/scopes', require('./routes/scope.route'));

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});