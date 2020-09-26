
const mongoose = require('mongoose'),
      bcrypt   = require('bcrypt');//bcrypt library is going to be used for passport hashing(take a plain text passport and turn it into something that cannot be reversed)

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  ]
});

//hook to hash the password
userSchema.pre('save', async function(next) {
  try {
    if(!this.isModified('password')) {
      return next(); // if you have not changed the password then don't go in and hash it again
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);  //10 is for the salting of the password; await because bcrypt.hash isn't an async action
    this.password = hashedPassword;
    return next(); //will move to saving the password in the database
  } catch(err) {
    return next(err); //this will go to our error handler
  }
});
//password comparison
userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch(err) {
    return next(err);
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;

