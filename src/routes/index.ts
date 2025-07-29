import express from "express";

const indexRoutes = () => {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
  });

  return router;
};

export default indexRoutes;
