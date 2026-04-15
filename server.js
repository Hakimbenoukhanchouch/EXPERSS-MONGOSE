const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

// config
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// DB connection
mongoose.connect("mongodb://127.0.0.1:27017/tpcrud")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const Product = require("./models/Product");

// =====================
// READ (Afficher)
// =====================
app.get("/", async (req, res) => {
  const produits = await Product.find();
  res.render("index", { produits });
});

// =====================
// CREATE
// =====================
app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", async (req, res) => {
  await Product.create(req.body);
  res.redirect("/");
});

// =====================
// UPDATE
// =====================
app.get("/edit/:id", async (req, res) => {
  const produit = await Product.findById(req.params.id);
  res.render("edit", { produit });
});

app.put("/edit/:id", async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

// =====================
// DELETE
// =====================
app.delete("/delete/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});