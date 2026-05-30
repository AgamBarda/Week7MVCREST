const express = require('express');
const app = express();

const articleRoutes = require('./routes/articles');

app.use(express.json());

app.use('/api/articles', articleRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});