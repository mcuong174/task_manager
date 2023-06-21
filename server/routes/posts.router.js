import express from "express";
const router = express();

import postsController from "../controller/posts.controller.js";

router.get("/tasks", postsController.getAll);
router.get("/task/:id", postsController.getById);
router.post("/newTask", postsController.create);
router.put("/task/:id", postsController.update);
router.delete("/delete/task/:id", postsController.delete);

export default router;
