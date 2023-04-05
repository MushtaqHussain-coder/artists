const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');
const response = require('./lib/response');
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', apiRouter);

// error handler
app.use((err, req, res, next) => {
  const resp = response();
  resp.success = false;

  console.error(err);

  if (app.get('env') !== 'production') {
    resp.message = err.message || 'Something went wrong!';
    resp.data = err.stack || err || null;
  } else {
    resp.message = 'Internal error occurred!';
  }

  res.status(500).json(resp);
});

// catch 404
app.use((req, res, next) => {
  const resp = response();
  resp.success = false;
  resp.message = 'Route not found!';

  res.status(404).json(resp);
});

app.listen(port, () => {
  console.log(`Node App is listening on ${port}`);
});
