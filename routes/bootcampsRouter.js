const express = require("express");
const {
  getBootcamps,
  getBootcampById,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcampsController");
const router = express.Router();

router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .get(getBootcampById)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router; // Exportando Router
