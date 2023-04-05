const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// enable CORS
app.use('/api', apiRouter);

// error handler
app.use((err, req, res, next) => {
  const resp = {};
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
    next();
    const resp = {};
    resp.success = false;
    resp.message = 'Route not found!';
  
    res.status(404).json(resp);
  });

app.listen(port, () => {
  console.log(`Node App is listening on ${port}`);
});