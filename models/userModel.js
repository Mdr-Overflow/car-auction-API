const mongoose = require('mongoose');
const slugify = require('slugify');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Must contains an email'],
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
    required: [false]
  },
  phone_number:{
    type: Number,
    required: [false]
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

  Profile_picture:{
    type:String,
    required:[false]
  }

}, { collection: 'users' });

userSchema.pre('save', function (next) {
  this.slug = slugify(this.email, { lower: true });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
