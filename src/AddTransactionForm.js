import React, { useState } from 'react';

const AddTransactionForm = () => {
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = {
      account,
      amount: parseFloat(amount),
      date,
    };

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Transaction added:', data);
        setAccount('');
        setAmount('');
        setDate('');
      } else {
        console.error('Error adding transaction');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Account:</label>
        <input 
          type="text" 
          value={account} 
          onChange={(e) => setAccount(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Amount:</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Date:</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransactionForm;
