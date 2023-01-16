/* eslint-disable prettier/prettier */
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage, });


const carRouter = require('./routes/carRoutes');
const userRouter = require('./routes/userRoutes');
const interestRouter = require('./routes/interestRoutes');
const offerRouter = require('./routes/offerRoutes');
const auctionRouter = require('./routes/auctionRoutes');

const imageRouter = require('./routes/imageRoutes')

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
app.use('/api/v1/offers', offerRouter)
app.use('/api/v1/auctions', auctionRouter)
app.use('/api/v1/images', imageRouter)

app.all('*', (req, res, next) => {
  next(new AppError('Can not find this url on this server', 404));
});

// For image upload
router.post('api/v1/upload', upload.single('image'), async (req, res, next) => {
  const image = { data: new Buffer.from(req.file.buffer, 'base64'), contentType: req.file.mimetype }
  const savedImage = await ImageModel.create(image);
  res.send(savedImage);
});
// For image down
router.get('api/v1/getImage/:id', async (req, res, next) => {
  const { id: _id } = req.params;
  // lean decodes to base64
  const image = await ImageModel.findOne({ _id }).lean().exec();
  res.send(image);
});


app.use(globalErrorHandler);

module.exports = app;
