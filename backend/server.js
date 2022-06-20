const express = require('express')
// const bodyParser = require('body-parser')
const cors = require('cors')
// const Papa = require('papaparse')
// const fs = require('fs');
// const path = require('path');
const bodyParser = require('body-parser');
// const router = express.Router();
// const App = require('./App.js');
const Application = require('./Application.js');

require('dotenv').config()

const express_app = express()
const port = 3002;

express_app.use(cors())
express_app.use(bodyParser.urlencoded({ extended: false }))
express_app.use(express.json())

const application = new Application(express_app)

express_app.listen(port, () => console.log(`App listening on port ${port}!`));
