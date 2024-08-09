const fs = require('fs');
const csv = require('csv-parser');
const { DataSource } = require('typeorm');
const TransactionSchema = require('./src/entity/Transaction');

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1111',
    database: 'fuelfinance_database',
    entities: [TransactionSchema], 
    synchronize: true,
});

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
          const transactionRepository = AppDataSource.getRepository(TransactionSchema);
          await transactionRepository.save(transactions);
          console.log('CSV file successfully processed and saved to database');
      });

}).catch(error => console.log("Database connection error:", error));
