const express = require('express');
const router = express.Router();
app.post('/add-product', async (req, res) => {
    try {
        const { product_name, description, price, image_url, stock_quantity } = req.body;

        pool.query('INSERT INTO products (product_name, description, price, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?)', 
                   [product_name, description, price, image_url, stock_quantity], (error, results) => {
            if (error) {
                return res.status(500).send('Server error.');
            }
            res.status(201).send('Product added.');
        });
    } catch (err) {
        res.status(500).send('Server error.');
    }
});
app.get('/product/:id', (req, res) => {
    pool.query('SELECT * FROM products WHERE product_id = ?', [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send('Server error.');
        }
        res.json(results[0]);
    });
});
app.put('/update-product/:id', (req, res) => {
    const { product_name, description, price, image_url, stock_quantity } = req.body;

    pool.query('UPDATE products SET product_name = ?, description = ?, price = ?, image_url = ?, stock_quantity = ? WHERE product_id = ?', 
               [product_name, description, price, image_url, stock_quantity, req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send('Server error.');
        }
        res.send('Product updated.');
    });
});
app.delete('/delete-product/:id', (req, res) => {
    pool.query('DELETE FROM products WHERE product_id = ?', [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send('Server error.');
        }
        res.send('Product deleted.');
    });
});
module.exports = router;