require('dotenv').config();
const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

const PORT = process.env.API_PORT;
const HOST = process.env.API_HOST;

const app = express();

app.use(cors());                                 // Activation de CORS
// app.use(morgan('tiny'));                         // Activation de Morgan
app.use(express.json());                         // Activation du raw (json)
app.use(express.urlencoded({ extended: true}));  // Activation de x-www-form-urlencoded

const db = require("./models");
db.sequelize.sync({ force: false });

app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
