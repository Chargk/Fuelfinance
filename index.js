const express = require('express');
const AppDataSource = require('./data-source');
const Transaction = require('./src/entity/Transaction');

const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use((req, res, next) => {
    console.log('Headers:', req.headers);
    next();
});

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

    // app.post('/api/transactions', async (req, res) => {
    //     const { account, amount, date } = req.body;
    //     const transactionRepository = AppDataSource.getRepository(Transaction);
    //     const newTransaction = transactionRepository.create({
    //         account,
    //         amount,
    //         date
    //     });
    //     await transactionRepository.save(newTransaction);
    //     res.json(newTransaction);
    // }); dont need that quiet yet but im sure it will work
    

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

}).catch(error => console.log("Database connection error:", error));
