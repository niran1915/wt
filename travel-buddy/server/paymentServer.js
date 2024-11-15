const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5002;

app.use(cors());
app.use(bodyParser.json());

// Mock payment route
app.post('/api/payment', (req, res) => {
  const { fare, paymentMethod } = req.body;

  // Simulate payment logic (e.g., checking balance, transaction status)
  if (fare > 0) {
    res.json({ status: 'success', message: 'Payment Successful' });
  } else {
    res.json({ status: 'failed', message: 'Payment Failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Payment server running on port ${PORT}`);
});
