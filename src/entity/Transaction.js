const { EntitySchema } = require('typeorm');

const TransactionSchema = new EntitySchema({
    name: 'Transaction',
    tableName: 'transactions',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        account: {
            type: 'varchar',
        },
        amount: {
            type: 'float',
        },
        date: {
            type: 'date',
        }
    }
});

module.exports = TransactionSchema;
