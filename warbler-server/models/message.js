const mongoose = require("mongoose"),
  User = require("./user");

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: 160
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true // this will create a created at and an updated at for each individual document that this messageSchema creates
  }
);

messageSchema.pre("remove", async function(next) {
  try {
    //find a user
    let user = await User.findById(this.user);
    //remove the id of the message from their message list
    user.messages.remove(this.id); //remove is a mongoose method
    //save that user
    await user.save();
    //return next
    return next();
  } catch (err) {
    return next(err);
  }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
