const fs = require('fs');
const csv = require('csv-parser');
const AppDataSource = require('./data-source');
const Transaction = require('./src/entity/Transaction');

AppDataSource.initialize().then(async () => {
    console.log("Connected to the database");

    const transactions = [];

    fs.createReadStream('./public/fuelfinancetest.csv')
        .pipe(csv())
        .on('data', (row) => {
            const date = new Date(row['Date']);
            const formattedDate = date.toISOString().split('T')[0];

            transactions.push({
                account: row['PL Account'],
                amount: parseFloat(row['Amount']),
                date: formattedDate
            });
        })
        .on('end', async () => {
            const transactionRepository = AppDataSource.getRepository(Transaction);
            await transactionRepository.save(transactions);
            console.log('CSV file successfully processed and saved to database');
        });

}).catch(error => console.log("Database connection error:", error));
