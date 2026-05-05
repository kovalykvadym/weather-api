const express = require('express');
const app = express();

app.use(express.json());

app.get('/weather', (req, res) => {
    const payload = {
        "city": "Kyiv",
        "temperature": 20,
        "description": "Sunny",
        'query': req.query
    }

    res.json();
    res.end(JSON.stringify(payload))
})

module.exports = app;