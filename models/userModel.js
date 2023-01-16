const mongoose = require('mongoose');
const slugify = require('slugify');

const interestModel = require('../models/interestModel');
const offerModel = require('../models/offerModel');
const auctionModel = require('../models/auctionModel');
//const carModel = require('../models/movieModel');
var ObjectId = require('mongoose').Types.ObjectId; 


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Must contains an email'],
    unique : true, dropDups: true 
  },
  slug: String,
  nickname:{
    type: String,
    required: [false],
   
  },
  password:{
    type: String,
    require: [true, 'Must be passw protected']
  },
  email_verified:{
    type: Boolean,
    required : [false],
    default: false
  },
  role:{
    type: String,
    required:[true, 'role:?'],
    default: "viewer"
  },
  phone_number:{
    type: Number,
    required: [false],
    unique : true, dropDups: true 
  },
  age:{
    type: Number,
    required:[false]
  },
  Interests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interest"                 //litera mare la inceput - numele tabelei
    }
  ],

  Cars:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car"                 //litera mare la inceput - numele tabelei
    }
  ],

  Balance: {
    type:Number
  }
  ,
  Profile_picture:{
    type:String,  //URL
    required:[false]
  }

}, { collection: 'users' });

userSchema.pre('save', function (next) {
  this.slug = slugify(this.email, { lower: true });
  next();
});


 // PRE-HOOK FOR DELETING "CASCADE-STYLE"
 userSchema.pre('remove',  async function(next) {
  console.log('this gets printed first');
  
  //Interests
  console.log(this)
  console.log(this.id)
  console.log(new mongoose.Types.ObjectId(this.id))
  
  var query = { User: new ObjectId(this.id) };
  
  console.log(this.Interests.length)
  var size = this.Interests.length

  if (size != 0){
      do {
      const rez = await interestModel.findOneAndRemove( query )
      console.log(rez)
      size= size-1;
      } while (size != 0)
  }

  //Offers
  var query = { Poster: new ObjectId(this.id) };
  
  
  do{
   var rez2 = await offerModel.findOne(query) 
   rez2 = await offerModel.findOneAndRemove( query ) 
   console.log(rez2)

  } while( !rez2  )
  // deletes till there is nothing else wiht that Poster id in the DB

  //Bidders 

  var query = { Bidders: new ObjectId(this.id) };
  await auctionModel.findOneAndRemove(query);

  //Seller ( if seller deletes account)


  var query = { Seller: new ObjectId(this.id) };
  await auctionModel.findOneAndRemove(query);

  next();
});

// User model : C done , V ?
const User = mongoose.model('User', userSchema);

module.exports = User;
