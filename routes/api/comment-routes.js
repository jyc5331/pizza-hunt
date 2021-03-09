const router = require("express").Router();
const {
  addComment,
  removeComment,
} = require("../../controllers/comment-controller");

// /api/comments/<pizzaId>
//remembering that a post sends data to a server
router.route("/:pizzaId").post(addComment);

// /api/comments/<pizzaId>/<commentId>
router.route("/:pizzaId/:commentId").delete(removeComment);

module.exports = router;
