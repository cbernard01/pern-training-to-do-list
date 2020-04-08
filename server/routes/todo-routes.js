const express = require("express");
const pool = require("../db/pg-db");
const router = express.Router();

// Get all items
router.get("/todos", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM todo");

    res.json(allItems.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// Get an item by Id
router.get("/todo/:id", async (req, res) => {
  try {
    const {id} = req.params;

    const item = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

    res.json(item.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Create an item
router.post("/todo", async (req, res) => {
  try {
    const {description} = req.body;

    const newItem = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

    res.json(newItem.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Update an item
router.put("/todo/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {description} = req.body;

    const updatedItem = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *", [description, id]);

    res.json(updatedItem.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Delete a item by Id
router.delete("/todo/:id", async (req, res)=> {
  try {
    const {id} = req.params;

    const deleteItem = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

    res.json(deleteItem.rows[0]);
  } catch(err) {
    console.log(err.message);
  }
});

module.exports = router;
