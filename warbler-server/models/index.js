const mongoose = require("mongoose");

mongoose.set('debug', true);//useful to see the actual mongo queries being actually run in the terminal
mongoose.set('useCreateIndex', true); //removes the warning 'collection.ensureIndex is deprecated. Use createIndexes instead.'
mongoose.Promise = Promise;//so we do not have to use a call back pattern and also so we can use ES2017 async functions that return promises.
mongoose.connect('mongodb://localhost/warbler', {
  keepAlive: true,
  useNewUrlParser: true
});

module.exports.User = require("./user");  //bundling
module.exports.Message = require("./message");