const express = require('express');
const router = express.Router();
app.post('/cart', async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;

        pool.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)', 
                   [user_id, product_id, quantity], (error, results) => {
            if (error) {
                return res.status(500).send('Server error.');
            }
            res.status(201).send('Item added to cart.');
        });
    } catch (err) {
        res.status(500).send('Server error.');
    }
});
app.get('/cart/:userId', (req, res) => {
    pool.query('SELECT products.product_name, products.description, products.price, cart.quantity FROM cart INNER JOIN products ON cart.product_id = products.product_id WHERE cart.user_id = ?', [req.params.userId], (error, results) => {
        if (error) {
            return res.status(500).send('Server error.');
        }
        res.json(results);
    });
});
app.delete('/cart/:cartId', (req, res) => {
    pool.query('DELETE FROM cart WHERE cart_id = ?', [req.params.cartId], (error, results) => {
        if (error) {
            return res.status(500).send('Server error.');
        }
        res.send('Item removed from cart.');
    });
});
app.put('/cart/:cartId', (req, res) => {
    const { quantity } = req.body;

    pool.query('UPDATE cart SET quantity = ? WHERE cart_id = ?', [quantity, req.params.cartId], (error, results) => {
        if (error) {
            return res.status(500).send('Server error.');
        }
        res.send('Cart item quantity updated.');
    });
});
app.get('/checkout/total/:userId', (req, res) => {
    pool.query('SELECT SUM(products.price * cart.quantity) as total FROM cart INNER JOIN products ON cart.product_id = products.product_id WHERE cart.user_id = ?', [req.params.userId], (error, results) => {
        if (error) {
            return res.status(500).send('Server error.');
        }
        res.json(results[0]);
    });
});
app.post('/checkout/process-payment', (req, res) => {
    // Dummy processing here...
    res.send('Payment processed.');
});
app.post('/checkout/complete-order/:userId', (req, res) => {
    // Update inventory and create order record.
    // Here we just send a success message.
    res.send('Order completed.');
});

module.exports = router;