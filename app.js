/* eslint-disable prettier/prettier */
const express = require('express');
const morgan = require('morgan');

const carRouter = require('./routes/carRoutes');
const userRouter = require('./routes/userRoutes');
const interestRouter = require('./routes/interestRoutes');
//const carRouter = require('./routes/carRoutes');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// RUN ONCE
const carModel = require('./models/carModel')

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // GET /api/v1/cars 200 6.921 ms - 8569
}
// middleware
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/cars', carRouter); //middleware
app.use('/api/v1/users', userRouter)
app.use('/api/v1/interests', interestRouter)
//app.use('/api/v1/cars', carRouter)

app.all('*', (req, res, next) => {
  next(new AppError('Can not find this url on this server', 404));
});

app.use(carModel)

app.use(globalErrorHandler);

module.exports = app;
