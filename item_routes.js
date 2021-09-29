const express = require('express');
const router = new express.Router()
const ExpressError = require('./expressError')
const items = require('./fakeDB')

// GET all items
router.get('/', (req, res) => {
    res.json({ items })
})

// POST new item
router.post('/', (req, res) => {
    const new_item = { name: req.body.name, price: req.body.price }
    items.push(new_item)
    res.status(201).json({ item: new_item })
});

//GET a item by name
router.get('/:name', (req, res) => {
    const found_item = items.find(item => item.name === req.params.name)
    if (found_item === undefined) {
        throw new ExpressError("item not found", 404)
    }
    res.json({ item: found_item })
})

//PATCH edit a item
router.patch('/:name', (req, res) => {
    const found_item = items.find(item => item.name === req.params.name)
    if (found_item === undefined) {
        throw new ExpressError("item not found", 404)
    }
    found_item.name = req.params.body
    res.json({ name: found_item.name })
})

// DELETE a item
router.delete('/:name', (req, res) => {
    const found_item = items.find(item => item.name === req.params.name)
    if (found_item === -1) {
        throw new ExpressError("item not found", 404)
    }
    items.splice(found_item, 1)
    res.json({ message: "Deleted" })
})

module.exports = router