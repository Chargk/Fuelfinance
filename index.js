const express = require('express');
const AppDataSource = require('./data-source');
const Transaction = require('./src/entity/Transaction');

const app = express();
const port = 3000;

AppDataSource.initialize().then(() => {
    console.log("Connected to the database");

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.get('/api/transactions', async (req, res) => {
        const transactionRepository = AppDataSource.getRepository(Transaction);
        const transactions = await transactionRepository.find();
        res.json(transactions);
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

}).catch(error => console.log("Database connection error:", error));
