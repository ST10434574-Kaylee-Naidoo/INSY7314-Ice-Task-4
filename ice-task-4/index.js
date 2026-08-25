require('dotenv').config();

const express = require('express'); //imports package
const connectDB=require('./config/db'); 
const authRoutes = require('./routes/authRoutes');

const app = express(); //creates the express application

const PORT = process.env.PORT||3000;

connectDB();

app.use(express.json()); //allows the API to read JSON request bodies
  
app.use('/api/auth', authRoutes);

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
  
app.listen(PORT, () => { 
  console.log(`Running on port ${PORT}`); 
}); 