
const { DataSource } = require('typeorm');
const Transaction = require('./src/entity/Transaction'); 
const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1111',
    database: 'fuelfinance_database',
    entities: [Transaction],
    synchronize: true,
});

module.exports = AppDataSource;
