import express from "express";
import path from "path";

export default () => {
  const route = express.Router();

  route.get("/", (req, res) => {
    res.setHeader("a-header", "contents-of-header");
    res.render('Index');
  });

  route.get("/champions", (req, res) => {
    res.setHeader("a-header", "contents-of-header");
    res.render('Champions/Index');
  });
  
  route.get("/champions/:id", (req, res) => {
    res.setHeader("a-header", "contents-of-header");
    res.setHeader("Cache-Control", "public, max-age=15");
    res.render('Champions/Champion/Index', req.params);
  });

  return route;
}
