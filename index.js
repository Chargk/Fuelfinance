const express = require('express');
const { DataSource } = require('typeorm');

const app = express();
const port = 3000;

const AppDataSource = new DataSource({
    type: 'postgres', 
    host: 'localhost',
    port: 5432,
    username: 'postgres', 
    password: '1111', 
    database: 'fuelfinance_database', 
    entities: [__dirname + '/entity/*.js'], 
    synchronize: true,
});


AppDataSource.initialize().then(() => {
    console.log("Connect");
    app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log('Server is runninng on http:localhost:${port}')
});

}).catch(error => console.log("Database connect error: ", error));

