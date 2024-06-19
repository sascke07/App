require('dotenv').config()
const express = require("express");
import Connection from './dbConfig.js';
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT;
app.use(cors());

app.use(express.json());

app.post('/search', async (req, res) => {
Connection();
    console.log("asila");
    console.log(req.body.search);
    const searchTerm = req.body.search;
    const collection = mongoose.connection.db.collection('products');

    // Construct MongoDB Query (Customize Based on Your Data)
    const query = {
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } }
            // Add other searchable fields as needed
        ]
    };
    const results = await collection.find(query).toArray();
    res.json(results);
})
app.get('/', (req, res) => {
    res.send("server is running");
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
