import React, { useState, useEffect} from 'react';
import { Container, Table } from 'react-bootstrap';
import { formatCurrency } from "./utils";
import AccountAPI from '../services/AccountService'

const TransactionHistory = () => {
  const [accountInfo, setInfo] = useState([]);

  useEffect(() => {


    AccountAPI.getTransactions().then(result => {
      if (result.status === 200) {
          setInfo(result.data);
      
      }
    })

  }, {});

  return (

    
    <Container>
      
      {JSON.stringify(accountInfo) !== JSON.stringify([]) &&
        <div>
          <h3  className="bg-dark text-white">Account Number: {accountInfo[accountInfo.length - 1].accountId}</h3>
          <h4  className="bg-dark text-white">Balance: {formatCurrency(accountInfo[accountInfo.length - 1].balance)}</h4><br />
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {accountInfo.map(t => (
                <tr key={t.date}>
                  <td>{t.date}</td>
                  <td>{t.description}</td>
                  <td>{t.transactionType}</td>
                  <td>{formatCurrency(t.transactionType === 'Deposit' ? t.amount : t.amount * -1)}</td>
                  <td>{t.balance}</td>

                </tr>
              ))
              }
              {!accountInfo.length && 'No transactions recorded.'}
            </tbody>
          </Table>
        </div>
      }
    </Container>
  );
};

export default TransactionHistory;