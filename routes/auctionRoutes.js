/* eslint-disable prettier/prettier */
const express = require('express');

const auctionController = require('../controllers/auctionController');

const router = express.Router();

router.route('/').get(auctionController.getAllAuctions)
router.route('/:car_id').post(auctionController.createAuction);
router
  .route('/:id')
  .get(auctionController.getAuctionById)
  .patch(auctionController.updateAuction)
  .delete(auctionController.deleteAuction)
  .get(auctionController.getAllOffers);
router.route('/:car_id').get(auctionController.getAuctionByCarId)
router
    .route('/:offer_id/:auction_id')
    .post(auctionController.addOffer)
    .post(auctionController.acceptOffer)
    .post(auctionController.acceptBidder)
 

module.exports = router;
