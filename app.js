/* eslint-disable prettier/prettier */
const express = require('express');
const morgan = require('morgan');
const carRouter = require('./routes/carRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // GET /api/v1/cars 200 6.921 ms - 8569
}
// middleware
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/cars', carRouter); //middleware

app.all('*', (req, res, next) => {
  next(new AppError('Can not find this url on this server', 404));
});

app.use(globalErrorHandler);

module.exports = app;
