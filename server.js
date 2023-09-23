const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('./database');
const crudRoutes = require('./crud');
const cartRoutes = require('./cart');


const app = express();
app.use(express.json()); // for parsing JSON payloads
app.use('/api', crudRoutes); 
app.use('/cart-api', cartRoutes);


app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        pool.query('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)', 
                   [username, email, hashedPassword], (error, results) => {
            if (error) {
                return res.status(500).send('Server error.');
            }
            res.status(201).send('User registered.');
        });
    } catch (err) {
        res.status(500).send('Server error.');
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    pool.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error || results.length === 0) {
            return res.status(400).send('Invalid credentials.');
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(400).send('Invalid credentials.');
        }

        // Issue token
        const token = jwt.sign({ user_id: user.user_id }, '123', { expiresIn: '1h' });
        res.json({ token });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
