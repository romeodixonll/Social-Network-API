const router = require("express").Router();

const {
  getUser,
  getSingleUser,
  deleteUser,
  updateUser,
  addNewFriend,
  deleteFriend,
  createUser,
} = require("../../controllers/userController");

router.route("/").get(getUser).post(createUser);
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);
router.route("/:id/friends/:friendId").post(addNewFriend).delete(deleteFriend);

module.exports = router;
