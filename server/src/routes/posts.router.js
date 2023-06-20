import express from "express";
const router = express.Router();

import postsController from "../controller/posts.controller";

router.get("/tasks", postsController.getAll);
router.get("/task/:id", postsController.getById);
router.post("/newTask", postsController.create);
router.put("/task/:id", postsController.update);
router.delete("/delete/task/:id", postsController.delete);

module.exports = router;
