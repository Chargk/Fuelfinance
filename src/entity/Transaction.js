const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Transaction',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    date: {
      type: 'date',
    },
    plAccount: {
      type: 'varchar',
    },
    amount: {
      type: 'decimal',
    },
    description: {
      type: 'varchar',
    },
    counterparty: {
      type: 'varchar',
    },
  },
});
