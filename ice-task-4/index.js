const express = require('express'); //imports package 
const app = express(); //creates the express application

const PORT = process.env.PORT || 3000;
app.use(express.json()); //allows the API to read JSON request bodies
  
app.get('/', (req, res) => { 
  res.send('PhotoStore API is running'); 
}); 
  
app.get('/health', (req, res) => { 
  res.json({ status: 'OK' }); 
}); 
  
app.post('/message', (req, res) => { 
  const { message } = req.body; 
  res.json({ received: message }); 
}); 
  
app.listen(3000, () => { 
  console.log('Server running on port ${PORT}'); 
});