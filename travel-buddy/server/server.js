const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing (CORS) for frontend-backend communication
app.use(bodyParser.json()); // Parses incoming JSON request body

// Route to create a mock order
app.post('/create-order', (req, res) => {
  const { amount, packageName } = req.body; // Destructure request body to get amount and packageName

  // Simulate creating a unique order ID
  const orderId = `order_${Math.random().toString(36).substr(2, 9)}`; // Generate a random order ID
  console.log(`Created mock order: ${orderId}`); // Log the created order to the server console

  // Return the mock order ID to the frontend
  res.json({ orderId, packageName });
});

// Route to verify the mock payment status
app.post('/verify-payment', (req, res) => {
  const { orderId, paymentStatus } = req.body; // Get orderId and paymentStatus from the request

  // Simulate verifying payment success/failure
  if (paymentStatus === 'success') {
    console.log(`Payment for order ${orderId} was successful.`); // Log successful payment
    res.json({ status: 'success', message: 'Payment was successful!' }); // Respond with success
  } else {
    console.log(`Payment for order ${orderId} failed.`); // Log failed payment
    res.json({ status: 'failed', message: 'Payment failed. Please try again!' }); // Respond with failure
  }
});

// Start the server on port 5000
app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});

