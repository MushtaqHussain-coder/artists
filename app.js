const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '',
    data: {},
  });
});

app.listen(port, () => {
  console.log(`Node App is listening on ${port}`);
});