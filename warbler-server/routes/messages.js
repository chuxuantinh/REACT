const express = require("express"),
      router  = express.Router({mergeParams: true}); //mergeParams gives us access to the id inside of the router

const { createMessage, getMessage, deleteMessage } = require("../handlers/messages");
      

//prefix - /api/users/:id/messages
router.route("/").post(createMessage);

//prefix - /api/users/:id/messages/:message_id
router
  .route("/:message_id")
  .get(getMessage)
  .delete(deleteMessage);

module.exports = router;
